import type { IncomingMessage, ServerResponse } from 'node:http';
import mediaManifest from '../airo-media.json';

const ALLOWED_HOSTS = new Set([
  'img1.wsimg.com',
  'isteam.wsimg.com',
]);

const UPLOAD_MAPPING: Record<string, string> = {
  '/airo-assets/uploads/gold-bars-stacked-premium-bullion-tradin-UrpHH_.png':
    '/assets/images/gold-bars-stacked-premium-bullion-tradin-UrpHH_.png',
};

export default function handler(req: IncomingMessage, res: ServerResponse) {
  const urlObj = new URL(req.url || '/', 'http://localhost');
  const pathname = urlObj.pathname;

  const prefix = '/airo-assets/images/';
  let slotKey = '';

  if (pathname.startsWith(prefix)) {
    slotKey = pathname.slice(prefix.length);
  } else {
    slotKey = urlObj.searchParams.get('slot') || '';
  }

  const manifest = mediaManifest as Record<string, { currentUrl?: string; darkSurfaceUrl?: string; lightSurfaceUrl?: string }>;
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
}
