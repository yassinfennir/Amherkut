// Amherkut Leipomo - Service Worker
// PWA capabilities and offline functionality

const CACHE_NAME = 'amherkut-v1.0.0';
const STATIC_CACHE = 'amherkut-static-v1';
const DYNAMIC_CACHE = 'amherkut-dynamic-v1';

// Files to cache for offline functionality
const STATIC_FILES = [
    '/',
    '/index.html',
    '/assets/css/styles.css',
    '/assets/js/script.js',
    '/assets/js/chatbot-ai.js',
    '/assets/js/seo-optimizer.js',
    '/config/site-config.json',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install event - cache static files
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Caching static files...');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Static files cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Error caching static files:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }

    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                // Return cached version if available
                if (cachedResponse) {
                    console.log('Serving from cache:', request.url);
                    return cachedResponse;
                }

                // Otherwise fetch from network
                return fetch(request)
                    .then(response => {
                        // Don't cache if not a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Cache dynamic content
                        caches.open(DYNAMIC_CACHE)
                            .then(cache => {
                                cache.put(request, responseToCache);
                            });

                        return response;
                    })
                    .catch(error => {
                        console.log('Network request failed, serving offline page:', error);
                        
                        // Return offline page for navigation requests
                        if (request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        
                        // Return a custom offline response for other requests
                        return new Response(
                            JSON.stringify({
                                error: 'Offline',
                                message: 'You are currently offline. Please check your connection.',
                                timestamp: new Date().toISOString()
                            }),
                            {
                                status: 503,
                                statusText: 'Service Unavailable',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        );
                    });
            })
    );
});

// Background sync for form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        console.log('Background sync triggered');
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Get pending form submissions from IndexedDB
        const pendingSubmissions = await getPendingSubmissions();
        
        for (const submission of pendingSubmissions) {
            try {
                await fetch('/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submission.data)
                });
                
                // Remove from pending submissions
                await removePendingSubmission(submission.id);
                console.log('Background sync successful for submission:', submission.id);
            } catch (error) {
                console.error('Background sync failed for submission:', submission.id, error);
            }
        }
    } catch (error) {
        console.error('Background sync error:', error);
    }
}

// Push notifications
self.addEventListener('push', event => {
    console.log('Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'Uusi viesti Amherkut leipomosta!',
        icon: '/assets/icons/icon-192x192.png',
        badge: '/assets/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Katso tuotteet',
                icon: '/assets/icons/checkmark.png'
            },
            {
                action: 'close',
                title: 'Sulje',
                icon: '/assets/icons/xmark.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Amherkut Leipomo', options)
    );
});

// Notification click
self.addEventListener('notificationclick', event => {
    console.log('Notification clicked');
    
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/#products')
        );
    } else if (event.action === 'close') {
        // Just close the notification
        return;
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling from main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        const urlsToCache = event.data.urls;
        event.waitUntil(
            caches.open(DYNAMIC_CACHE)
                .then(cache => cache.addAll(urlsToCache))
        );
    }
});

// Utility functions for IndexedDB
async function getPendingSubmissions() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('AmherkutDB', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['pendingSubmissions'], 'readonly');
            const store = transaction.objectStore('pendingSubmissions');
            const getAllRequest = store.getAll();
            
            getAllRequest.onsuccess = () => resolve(getAllRequest.result);
            getAllRequest.onerror = () => reject(getAllRequest.error);
        };
        
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains('pendingSubmissions')) {
                db.createObjectStore('pendingSubmissions', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

async function removePendingSubmission(id) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('AmherkutDB', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['pendingSubmissions'], 'readwrite');
            const store = transaction.objectStore('pendingSubmissions');
            const deleteRequest = store.delete(id);
            
            deleteRequest.onsuccess = () => resolve();
            deleteRequest.onerror = () => reject(deleteRequest.error);
        };
    });
}

// Cache management
async function clearOldCaches() {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
        name.startsWith('amherkut-') && 
        name !== STATIC_CACHE && 
        name !== DYNAMIC_CACHE
    );
    
    return Promise.all(
        oldCaches.map(cacheName => caches.delete(cacheName))
    );
}

// Periodic cache cleanup
setInterval(clearOldCaches, 24 * 60 * 60 * 1000); // Daily cleanup
