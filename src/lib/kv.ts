/** Minimal Upstash Redis REST client — same KV store already used by the landing site's
 * payment webhook (KV_REST_API_URL / KV_REST_API_TOKEN), reused here for push subscriptions. */

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

async function command(...parts: string[]): Promise<unknown> {
  if (!KV_URL || !KV_TOKEN) throw new Error('KV not configured (KV_REST_API_URL / KV_REST_API_TOKEN missing)');
  const url = [KV_URL, ...parts.map(encodeURIComponent)].join('/');
  const res = await fetch(url, { headers: { Authorization: `Bearer ${KV_TOKEN}` }, cache: 'no-store' });
  if (!res.ok) throw new Error(`KV command failed (${parts[0]}): ${res.status}`);
  const data = await res.json();
  return data.result;
}

export async function kvGet(key: string): Promise<string | null> {
  const result = await command('get', key);
  return (result as string | null) ?? null;
}

export async function kvSet(key: string, value: string): Promise<void> {
  await command('set', key, value);
}

export async function kvDel(key: string): Promise<void> {
  await command('del', key);
}

export async function kvSadd(setKey: string, member: string): Promise<void> {
  await command('sadd', setKey, member);
}

export async function kvSrem(setKey: string, member: string): Promise<void> {
  await command('srem', setKey, member);
}

export async function kvSmembers(setKey: string): Promise<string[]> {
  const result = await command('smembers', setKey);
  return (result as string[] | null) ?? [];
}
