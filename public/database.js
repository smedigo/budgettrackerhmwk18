let db;

const request = indexDB.open("budget", 1);

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    const objectStore = db.createObjectStore("pending", {
      autoIncrement: true,
    });
  };

  // if success check the db
  request.onsuccess = (event) => {
    db = event.target.result;
    if (navigator.onLine) checkDatabase();
  };
  
  // if error, console.log the error
  request.onerror = (event) => {
    console.log(event.target.errorCode);
  };

  // save records
  const saveRecord=(record) => {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
  store.add(record);

  };

  // check DB when back online

  const checkDatabase = () => {
    // open a transaction on the pending db
    const transaction = db.transaction(["pending"], "readwrite");
    // access the store
    const Store = transaction.objectStore("pending");
    // get records from store
    const getAll = pendingStore.getAll();
  
    getAll.onsuccess = async () => {
        if (getAll.result.length > 0) {
          fetch("/api/transaction/bulk", {
              method: "POST",
              body: JSON.stringify(getAll.result),
              headers: {
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json"
              }
          });
  
          await res.json();
  
          // open a transaction on the pending db
          const transaction = db.transaction(["pending"], "readwrite");
  
          // access the store
          const Store = transaction.objectStore("pending");
  
          // Clear all items in the store
          Store.clear()
        };
    };
  };
  
  window.addEventListener("online", checkDatabase);