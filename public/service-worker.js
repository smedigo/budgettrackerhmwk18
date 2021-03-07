const STATIC_BUDGET = "static-budget-v1";
const BUDGET_DATA = "data-budget-v1";
const FILES_TO_CACHE = [
  "/",
  "/database.js",
  "/index.js",
  "/manifest.json",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// install action 

self.addEventListener("install", function(event) {

  event.waitUntil
  caches.open(STATIC_BUDGET).then(function(cache){
    return cache.addAll(FILES_TO_CACHE);
  })
  // const budgetData = await caches.open(BUDGET_DATA);
  // await budgetData.add("/api/transaction");
  // const staticBudget = await caches.open(STATIC_BUDGET);
  // await staticBudget.addAll(FILES_TO_CACHE);
  //self.skipWaiting();
});

self.addEventListener("fetch", function(event) {
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches.open(BUDGET_DATA).then(cache => {
        return fetch(event.request).then(response => {
          if (response.status === 200) {
            cache.put(event.request.url, response.clone());
          }
          return response;
        }).catch(err => {
          return cache.match(event.request);
        });
      }).catch(err => console.log(err))
    );
    return;
  }
event.respondWith(
  fetch(event.request).catch(function(){
    return caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else if (event.request.headers.get("accept").includes("text/html")) {
        return caches.match("/")
      }
    });
  })
)
  
})

//activate action
// self.addEventListener("activate", event=> {

// event.waitUntil(
//     caches.keys().then(keyList=>{
//         return Promise.all(
//             keyList.map(key=>{
//                 if(key !== STATIC_BUDGET && key !==BUDGET_DATA) {
//                     console.log("remove old data", key);
//                     return caches.delete(key);
//                 };
//             })
//         );
//     })
// );

// self.ClientRectList.claim();

// });




//fetch action
 