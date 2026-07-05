import { inflate } from 'pako';

export interface DecodedPng {
  width: number;
  height: number;
  channels: number; // 1 grayscale, 2 grayscale+alpha, 3 rgb, 4 rgba
  data: Uint8Array; // raw, de-filtered pixel bytes, row-major
}

const SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];

/** Minimal PNG decoder (8-bit, non-interlaced, non-palette) sufficient for reading small
 * crops produced by expo-image-manipulator, so we can sample real pixel luminance without
 * pulling in a native pixel-buffer module. Throws on anything it doesn't understand — callers
 * should fall back gracefully. */
export function decodePng(base64: string): DecodedPng {
  const bytes = base64ToBytes(base64);
  for (let i = 0; i < SIGNATURE.length; i++) {
    if (bytes[i] !== SIGNATURE[i]) throw new Error('Not a PNG');
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  let interlace = 0;
  const idatChunks: Uint8Array[] = [];

  while (offset < bytes.length) {
    const length = readUint32(bytes, offset);
    const type = String.fromCharCode(bytes[offset + 4], bytes[offset + 5], bytes[offset + 6], bytes[offset + 7]);
    const dataStart = offset + 8;

    if (type === 'IHDR') {
      width = readUint32(bytes, dataStart);
      height = readUint32(bytes, dataStart + 4);
      bitDepth = bytes[dataStart + 8];
      colorType = bytes[dataStart + 9];
      interlace = bytes[dataStart + 12];
    } else if (type === 'IDAT') {
      idatChunks.push(bytes.subarray(dataStart, dataStart + length));
    } else if (type === 'IEND') {
      break;
    }
    offset = dataStart + length + 4; // skip CRC
  }

  if (bitDepth !== 8) throw new Error(`Unsupported PNG bit depth: ${bitDepth}`);
  if (interlace !== 0) throw new Error('Interlaced PNG not supported');

  const channels = colorType === 0 ? 1 : colorType === 2 ? 3 : colorType === 4 ? 2 : colorType === 6 ? 4 : -1;
  if (channels === -1) throw new Error(`Unsupported PNG color type: ${colorType}`);

  const totalIdatLength = idatChunks.reduce((sum, c) => sum + c.length, 0);
  const idat = new Uint8Array(totalIdatLength);
  let pos = 0;
  for (const chunk of idatChunks) {
    idat.set(chunk, pos);
    pos += chunk.length;
  }

  const raw = inflate(idat);
  const bytesPerPixel = channels;
  const rowBytes = width * bytesPerPixel;
  const out = new Uint8Array(width * height * bytesPerPixel);
  let rawOffset = 0;
  let prevRow: Uint8Array | null = null;

  for (let y = 0; y < height; y++) {
    const filterType = raw[rawOffset];
    rawOffset += 1;
    const row = raw.subarray(rawOffset, rawOffset + rowBytes);
    rawOffset += rowBytes;
    const outRow = out.subarray(y * rowBytes, y * rowBytes + rowBytes);
    unfilterRow(filterType, row, prevRow, outRow, bytesPerPixel);
    prevRow = outRow;
  }

  return { width, height, channels, data: out };
}

function unfilterRow(filterType: number, row: Uint8Array, prevRow: Uint8Array | null, out: Uint8Array, bpp: number) {
  for (let i = 0; i < row.length; i++) {
    const a = i >= bpp ? out[i - bpp] : 0;
    const b = prevRow ? prevRow[i] : 0;
    const c = prevRow && i >= bpp ? prevRow[i - bpp] : 0;
    let value = row[i];
    switch (filterType) {
      case 0:
        break;
      case 1:
        value = (value + a) & 0xff;
        break;
      case 2:
        value = (value + b) & 0xff;
        break;
      case 3:
        value = (value + Math.floor((a + b) / 2)) & 0xff;
        break;
      case 4:
        value = (value + paeth(a, b, c)) & 0xff;
        break;
      default:
        throw new Error(`Unsupported PNG filter type: ${filterType}`);
    }
    out[i] = value;
  }
}

function paeth(a: number, b: number, c: number): number {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function readUint32(bytes: Uint8Array, offset: number): number {
  return (bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3];
}

const B64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const B64_LOOKUP = (() => {
  const table = new Int16Array(256).fill(-1);
  for (let i = 0; i < B64_CHARS.length; i++) table[B64_CHARS.charCodeAt(i)] = i;
  return table;
})();

/** Hand-rolled base64 decode — avoids depending on `atob`/`Buffer` availability across RN runtimes. */
function base64ToBytes(base64: string): Uint8Array {
  const clean = base64.replace(/[\r\n]/g, '');
  const padding = clean.endsWith('==') ? 2 : clean.endsWith('=') ? 1 : 0;
  const len = clean.length;
  const outLength = (len / 4) * 3 - padding;
  const bytes = new Uint8Array(outLength);

  let outIdx = 0;
  for (let i = 0; i < len; i += 4) {
    const a = B64_LOOKUP[clean.charCodeAt(i)];
    const b = B64_LOOKUP[clean.charCodeAt(i + 1)];
    const c = clean.charCodeAt(i + 2) === 61 ? 0 : B64_LOOKUP[clean.charCodeAt(i + 2)];
    const d = clean.charCodeAt(i + 3) === 61 ? 0 : B64_LOOKUP[clean.charCodeAt(i + 3)];

    const triple = (a << 18) | (b << 12) | (c << 6) | d;
    if (outIdx < outLength) bytes[outIdx++] = (triple >> 16) & 0xff;
    if (outIdx < outLength) bytes[outIdx++] = (triple >> 8) & 0xff;
    if (outIdx < outLength) bytes[outIdx++] = triple & 0xff;
  }
  return bytes;
}

/** Mean and population standard deviation of per-pixel luminance (0-255). */
export function luminanceStats(png: DecodedPng): { mean: number; stdDev: number } {
  const { data, channels } = png;
  const pixelCount = data.length / channels;
  let sum = 0;
  const luminances = new Float64Array(pixelCount);
  for (let i = 0, p = 0; i < data.length; i += channels, p++) {
    const lum = channels === 1 || channels === 2 ? data[i] : (data[i] + data[i + 1] + data[i + 2]) / 3;
    luminances[p] = lum;
    sum += lum;
  }
  const mean = sum / pixelCount;
  let variance = 0;
  for (let p = 0; p < pixelCount; p++) {
    const d = luminances[p] - mean;
    variance += d * d;
  }
  variance /= pixelCount;
  return { mean, stdDev: Math.sqrt(variance) };
}
