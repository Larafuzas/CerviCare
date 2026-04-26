const CACHE_NAME = 'cervicare-v1.7';
const urlsToCache = [
  './',
  './index.html',
  './icono.jpg',
  './flexion.jpg',
  './inclinacion.jpg',
  './rotacion.jpg',
  './circulos.jpg',
  './elevacion.jpg',
  './resistencia1.jpg',
  './resistencia2.jpg',
  './traccion1.jpg',
  './traccion2.jpg'
];

// Durante la instalación, guarda los archivos en la caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta las peticiones de red y sirve desde la caché si no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
