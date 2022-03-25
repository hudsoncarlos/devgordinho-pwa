const version = "0.0.1";
const cacheName = `ghlm-${version}`;

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache
        .addAll([
          "/",
          "/css/",
          "/css/index.css",
          "/getmdl/",
          "/getmdl/bower.json",
          "/getmdl/material.css",
          "/getmdl/material.js",
          "/getmdl/material.min.css",
          "/getmdl/material.min.css.map",
          "/getmdl/material.min.js",
          "/getmdl/material.min.js.map",
          "/getmdl/package.json",
          "/img/",
          "/img/blender/",
          "/img/blender/blender_black_1x.png",
          "/img/blender/blender_black_2x.png",
          "/img/blender/blender_white_1x.png",
          "/img/blender/blender_white_2x.png",
          "/img/email/",
          "/img/email/email_black_1x.png",
          "/img/email/email_black_2x.png",
          "/img/email/email_white_1x.png",
          "/img/email/email_white_2x.png",
          "/img/faces_happy/",
          "/img/faces_happy/faces_happy_black_1x.png",
          "/img/faces_happy/faces_happy_black_2x.png",
          "/img/faces_happy/faces_happy_white_1x.png",
          "/img/faces_happy/faces_happy_white_2x.png",
          "/img/image/",
          "/img/image/image_black_1x.png",
          "/img/image/image_black_2x.png",
          "/img/image/image_white_1x.png",
          "/img/image/image_white_2x.png",
          "/img/logo/",
          "/img/logo/logo_360x360.png",
          "/img/menu/",
          "/img/menu/menu_black_1x.png",
          "/img/menu/menu_black_2x.png",
          "/img/menu/menu_white_1x.png",
          "/img/menu/menu_white_2x.png",
          "/img/search/",
          "/img/search/search_black_1x.png",
          "/img/search/search_black_2x.png",
          "/img/search/search_white_1x.png",
          "/img/search/search_white_2x.png",
          "/js/",
          "/js/index.js",
          "/manifest.json",
          "/sw.js",
        ])
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.open(cacheName)
//       .then(cache => cache.match(event.request, {ignoreSearch: true}))
//       .then(response => {
//       return response || fetch(event.request);
//     })
//   );
// });

// self.addEventListener("refreshOffline", function () {
//   const offlinePageRequest = new Request();
// });

self.addEventListener("fetch", async (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const refresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return refresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
