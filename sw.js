/* AAROK — Service worker : site installable + consultable hors ligne.
 * - Pages HTML : réseau d'abord (toujours la dernière version), cache en secours.
 * - Fichiers /assets/ (noms hachés, immuables) et images : cache d'abord.
 * - Les requêtes vers d'autres domaines (Web3Forms, polices…) ne sont jamais interceptées.
 */
const VERSION = 'aarok-v1';
const PRECACHE = ['/', '/favicon.svg', '/manifest.webmanifest'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copie = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copie));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('/'))),
    );
    return;
  }

  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/images/') || url.pathname.startsWith('/icons/')) {
    e.respondWith(
      caches.match(req).then((r) => r || fetch(req).then((res) => {
        if (res.ok) {
          const copie = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copie));
        }
        return res;
      })),
    );
  }
});
