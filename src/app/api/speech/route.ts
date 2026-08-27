import { NextRequest, NextResponse } from 'next/server';

/** Server-only proxy to Gemini's text-to-speech endpoint — the API key lives in an environment
 * variable and never reaches the browser. Returns a playable WAV file (Gemini's TTS API returns
 * raw 16-bit PCM audio, which no browser <audio>/Audio() can play directly, so it gets a WAV
 * header wrapped around it here before going back to the client). */
const MODEL = 'gemini-2.5-flash-preview-tts';
const VOICE_NAME = 'Kore';

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
  }

  let body: { text?: string; lang?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const text = body.text?.trim();
  if (!text) {
    return NextResponse.json({ error: 'Missing text' }, { status: 400 });
  }

  const languageCode = body.lang === 'fr' ? 'fr-FR' : 'en-US';

  let upstream: Response;
  try {
    upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text }] }],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            languageCode,
            voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE_NAME } },
          },
        },
      }),
    });
  } catch {
    return NextResponse.json({ error: 'Could not reach Gemini' }, { status: 502 });
  }

  if (!upstream.ok) {
    const errText = await upstream.text().catch(() => '');
    return NextResponse.json({ error: `Gemini TTS request failed (${upstream.status}): ${errText}` }, { status: 502 });
  }

  const data = await upstream.json();
  const part = data?.candidates?.[0]?.content?.parts?.[0];
  const base64Audio: string | undefined = part?.inlineData?.data;
  const mimeType: string | undefined = part?.inlineData?.mimeType;

  if (!base64Audio) {
    return NextResponse.json({ error: 'No audio returned by Gemini' }, { status: 502 });
  }

  const sampleRateMatch = /rate=(\d+)/.exec(mimeType ?? '');
  const sampleRate = sampleRateMatch ? Number(sampleRateMatch[1]) : 24000;

  const pcmBuffer = Buffer.from(base64Audio, 'base64');
  const wavBuffer = pcmToWav(pcmBuffer, sampleRate);

  return new NextResponse(new Uint8Array(wavBuffer), {
    status: 200,
    headers: { 'Content-Type': 'audio/wav', 'Cache-Control': 'no-store' },
  });
}

/** Gemini's TTS response is raw 16-bit little-endian PCM with no container — this adds the
 * standard 44-byte WAV header so a browser can actually play it. */
function pcmToWav(pcmData: Buffer, sampleRate: number, numChannels = 1, bitsPerSample = 16): Buffer {
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;
  const dataSize = pcmData.length;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0, 'ascii');
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8, 'ascii');
  header.write('fmt ', 12, 'ascii');
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36, 'ascii');
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmData]);
}
