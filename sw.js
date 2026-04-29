// ATENCIÓN: Cambia este número de versión cada vez que subas cambios a GitHub
// Por ejemplo: v1.31, v1.32... Así el móvil sabrá que hay código nuevo.
const CACHE_NAME = 'cervicare-v1.34'; 

const urlsToCache = [
  './',
  './index.html',
  './icono.jpg',
  './manifest.json',
  // Si tienes imágenes locales (como flexion.jpg, electrodos.png), añádelas aquí:
  './flexion.jpg',
  './inclinacion.jpg',
  './rotacion.jpg',
  './circulos.jpg',
  './elevacion.jpg',
  './resistencia1.jpg',
  './resistencia2.jpg',
  './traccion1.jpg',
  './traccion2.jpg',
  './electrodos.png'
];

// 1. INSTALACIÓN DE LA NUEVA VERSIÓN
self.addEventListener('install', event => {
    // Force el Service Worker para que se instale inmediatamente sin esperar a que se cierre la app
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto, guardando archivos...');
                return cache.addAll(urlsToCache);
            })
    );
});

// 2. ACTIVACIÓN Y LIMPIEZA DE BASURA ANTIGUA
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Si el nombre del caché no coincide con la versión actual, lo borra
                    if (cacheName !== CACHE_NAME) {
                        console.log('Borrando caché antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Toma el control inmediato de la app abierta
    );
});

// 3. INTERCEPTOR (Sirve los archivos desde el móvil para funcionar sin internet)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Devuelve la versión en caché, o si no está, la busca en internet
                return response || fetch(event.request);
            })
    );
});
