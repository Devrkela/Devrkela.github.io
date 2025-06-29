// version = 1;
//importScripts("/sw/cache.js", "/sw/db.js", "/sw/onfetch.js");

const caches_url = [
  "/index.html",
  "/UX.css",
  "/cpu.js",
  "/model.js",
  "/sw/register.js",
  "/workout/index.html",
  "/workout/UX.css",
  "/workout/exercices/index.html",
  "/workout/exercices/UX.css",
  "/workout/exercices/cpu.js",
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
  "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap",
  "https://fonts.gstatic.com/s/materialsymbolsoutlined/v254/kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsI.woff2",
  "https://fonts.gstatic.com/s/opensans/v43/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2",
  "https://fonts.gstatic.com/s/ebgaramond/v31/SlGUmQSNjdsmc35JDF1K5GR1SDk.woff2",
  "/manifest.json",
  "/icons/192.png",
  "/icons/512.png",

];

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request));
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