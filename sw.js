// version = 1;
//importScripts("/sw/cache.js", "/sw/db.js", "/sw/onfetch.js");

console.log(self.location)
const caches_url = [
  self.location.origin + "/index.html",
  self.location.origin + "/UX.css",
  self.location.origin + "/cpu.js",
  self.location.origin + "/model.js",
  self.location.origin + "/sw/register.js",
  self.location.origin + "/workout/index.html",
  self.location.origin + "/workout/UX.css",
  self.location.origin + "/workout/exercices/index.html",
  self.location.origin + "/workout/exercices/UX.css",
  self.location.origin + "/workout/exercices/cpu.js",
  self.location.origin + "/manifest.json",
  self.location.origin + "/icons/192.png",
  self.location.origin + "/icons/512.png",

];

function cacheOrFetch(request){
  return caches.match(request).then(function(response){
    if(!response){
      return fetch(request).then(function cacheRequest(response){
        const cache_res = response.clone();
        caches.open("v1").then(function(cache){
          cache.put(request, cache_res);
        });

        return response;
      })
    }
    return response
  });
}

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheOrFetch(event.request));
});

self.addEventListener("activate", function(event){
  clients.claim();
});

const addResourcesToCache = (resources) => {
  const promises = [];

  for(let url of caches_url){
    promises.push(caches.open("v1").then((cache)=>{return cache.add(url);}).catch(()=>{console.log(url)}))
  }
  return Promise.all(promises);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache(caches_url),
  );
});