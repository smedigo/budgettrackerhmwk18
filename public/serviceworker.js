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

// install
self.addEventListener("install", async (e) => {
  const budgetData = await caches.open(BUDGET_DATA);
  await budgetData.add("/api/transaction");

  const staticBudget = await caches.open(STATIC_BUDGET);
  await staticBudget.addAll(FILES_TO_CACHE);

  self.skipWaiting();
});
