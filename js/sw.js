const cacheName = 'portfolio'

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName).then(function (cache){
            cache.addAll([
                './index.js',
                '../index.html',
                '../manifest.webmanifest',
                '../css/index.css',
                '../getmdl/bower.json',
                '../getmdl/material.css',
                '../getmdl/material.js',
                '../getmdl/material.min.css',
                '../getmdl/material.min.css.map',
                '../getmdl/material.min.js',
                '../getmdl/material.min.js.map',
                '../getmdl/package.json',
                '../img/blender/blender_black_1x.png',
                '../img/blender/blender_black_2x.png',
                '../img/blender/blender_white_1x.png',
                '../img/blender/blender_white_2x.png',
                '../img/email/email_black_1x.png',
                '../img/email/email_black_2x.png',
                '../img/email/email_white_1x.png',
                '../img/email/email_white_2x.png',
                '../img/faces_happy/faces_happy_black_1x.png',
                '../img/faces_happy/faces_happy_black_2x.png',
                '../img/faces_happy/faces_happy_white_1x.png',
                '../img/faces_happy/faces_happy_white_2x.png',
                '../img/image/image_black_1x.png',
                '../img/image/image_black_2x.png',
                '../img/image/image_white_1x.png',
                '../img/image/image_white_2x.png',
                '../img/logo/logo_360x360.png',
                '../img/menu/menu_black_1x.png',
                '../img/menu/menu_black_2x.png',
                '../img/menu/menu_white_1x.png',
                '../img/menu/menu_white_2x.png',
                '../img/search/search_black_1x.png',
                '../img/search/search_black_2x.png',
                '../img/search/search_white_1x.png',
                '../img/search/search_white_2x.png'
            ])
        })
    )
    return self.skipWaiting()
})

self.addEventListener('activate', e =>{
    self.clients.claim()
})

self.addEventListener('fetch', async e =>{
    const req = e.request
    const url = new URL(req.url)

    if(url.login === location.origin){
        e.respondWith(cacheFirst(req))
    } else{
        e.respondWith(networkAndCache(req))
    }
})

async function cacheFirst(req){
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req)

    return cached || fetch(req)
}

async function networkAndCache(req){
    const cache = await caches.open(cacheName);
    try{
        const refresh = await fetch(req)
        await cache.put(req, fresh.clone())
        return refresh
    } catch(e){
        const cached = await cache.match(req);
        return cached
    }
}