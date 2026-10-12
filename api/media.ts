import type { IncomingMessage, ServerResponse } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ALLOWED_HOSTS = new Set([
  'img1.wsimg.com',
  'isteam.wsimg.com',
]);

const UPLOAD_MAPPING: Record<string, string> = {
  '/airo-assets/uploads/gold-bars-stacked-premium-bullion-tradin-UrpHH_.png':
    '/assets/images/gold-bars-stacked-premium-bullion-tradin-UrpHH_.png',
};

let cachedManifest: Record<string, { currentUrl?: string; darkSurfaceUrl?: string; lightSurfaceUrl?: string }> | null = null;

function getManifest(): Record<string, { currentUrl?: string; darkSurfaceUrl?: string; lightSurfaceUrl?: string }> {
  if (cachedManifest) return cachedManifest;

  const possiblePaths = [
    join(process.cwd(), 'airo-media.json'),
    join(process.cwd(), 'public', 'airo-media.json'),
    join(__dirname, '..', 'airo-media.json'),
  ];

  for (const p of possiblePaths) {
    if (existsSync(p)) {
      try {
        cachedManifest = JSON.parse(readFileSync(p, 'utf-8'));
        return cachedManifest!;
      } catch (e) {
        console.error('Failed to parse manifest at', p, e);
      }
    }
  }

  return {};
}

export default function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const urlObj = new URL(req.url || '/', 'http://localhost');
    const pathname = urlObj.pathname;

    const prefix = '/airo-assets/images/';
    let slotKey = '';

    if (pathname.startsWith(prefix)) {
      slotKey = pathname.slice(prefix.length);
    } else {
      slotKey = urlObj.searchParams.get('slot') || '';
    }

    const manifest = getManifest();
    const slot = manifest[slotKey];

    if (!slot || !slot.currentUrl) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Media slot not found', slotKey }));
      return;
    }

    let targetUrl = slot.darkSurfaceUrl || slot.currentUrl;

    if (UPLOAD_MAPPING[targetUrl]) {
      targetUrl = UPLOAD_MAPPING[targetUrl];
    }

    res.statusCode = 302;
    res.setHeader('Location', targetUrl);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.end();
  } catch (err) {
    console.error('media handler error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal media resolver error' }));
  }
}
