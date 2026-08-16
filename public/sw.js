const CACHE = "slow-dev-v2";
const APP_SHELL = ["/", "/manifest.webmanifest", "/avatar-poster.jpg", "/banner-poster.jpg"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/_next/") || request.headers.get("RSC") || url.searchParams.has("_rsc")) return;

  const cacheable = ["style", "script", "image", "font"].includes(request.destination) || url.pathname.startsWith("/icons/");
  if (!cacheable) return;

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      if (response.ok) {
        const clone = response.clone();
        caches.open(CACHE).then((cache) => cache.put(request, clone));
      }
      return response;
    }).catch(() => caches.match("/"))),
  );
});
