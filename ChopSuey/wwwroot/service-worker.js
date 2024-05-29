
const CACHE_NAME = 'offline-cache';
const OFFLINE_URL = '/contact.html';
const HOME_PAGE_URL = '/';
const USER_DATA_KEY = 'user-data';
const TTL = 60 * 60 * 1000; 

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                OFFLINE_URL,
                HOME_PAGE_URL,
                '/Home.css',
                '/9d152e251654ef4edbcecb95f610106a.png',
                '/original-0d3f7160917abdeaeeae331e205fefa6.png',
                '/css/Home.css',
                '/css/site.css',
                '/js/site.js',
                '/lib/bootstrap/dist/css/bootstrap.css',
                '/lib/jquery/dist/jquery.js',
                '/js/product.js',
                '/js/navigation.js',
                '/js/pwa-install.js',
                'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css'
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(HOME_PAGE_URL);
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});

async function saveUserData(userData) {
    const cache = await caches.open(CACHE_NAME);
    const url = new URL(USER_DATA_KEY, location.href);
    const cacheData = new Response(JSON.stringify(userData), {
        headers: { 'Content-Type': 'application/json' }
    });
    await cache.put(url, cacheData);
}

async function loadUserData() {
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(USER_DATA_KEY);
    if (response) {
        return await response.json();
    }
    return null;
}

async function clearUserData() {
    const cache = await caches.open(CACHE_NAME);
    await cache.delete(USER_DATA_KEY);
}


setTimeout(async () => {
    await clearUserData();
}, TTL);