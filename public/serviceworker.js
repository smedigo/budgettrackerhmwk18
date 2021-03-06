onst STATIC_BUDGET = "static-budget-v1";
const BUDGET_DATA = "data-budget-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// install action 

self.addEventListener("install", async (event) => {
  const budgetData = await caches.open(BUDGET_DATA);
  await budgetData.add("/api/transaction");

  const staticBudget = await caches.open(STATIC_BUDGET);
  await staticBudget.addAll(FILES_TO_CACHE);

  self.skipWaiting();
});

//activate action
self.addEventListener("activate", event=> {

event.waitUntil(
    caches.keys().then(keyList=>{
        return Promise.all(
            keyList.map(key=>{
                if(key !== STATIC_BUDGET && key !==BUDGET_DATA) {
                    console.log("remove old data", key);
                    return caches.delete(key);
                };
            })
        );
    })
);

self.ClientRectList.claim();

});




//fetch action



