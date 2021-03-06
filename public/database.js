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