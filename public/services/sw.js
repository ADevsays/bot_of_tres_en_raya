const STATIC_CACHE = "static";

self.addEventListener("install", e =>{
    e.waitUntil(caches.open(STATIC_CACHE));
});

self.addEventListener('fetch', async (event) => {
    console.log('fetchSADFJSALDK;FJ')
      event.respondWith(caches.open(STATIC_CACHE).then((cache) => {
        // Respond with the image from the cache or from the network
        return cache.match(event.request).then((cachedResponse) => {
          return cachedResponse || fetch(event.request.url).then((fetchedResponse) => {
            // Add the network response to the cache for future visits.
            // Note: we need to make a copy of the response to save it in
            // the cache and use the original as the request response.
            cache.put(event.request, fetchedResponse.clone());
  
            // Return the network response
            return fetchedResponse;
          });
        });
      }));
  });