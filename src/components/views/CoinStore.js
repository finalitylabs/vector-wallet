export default class CoinStore {
  constructor(web3) {
    this.ethAddress = web3.address;
    this.indexedDBAvailable = window.indexedDB;
  }

  init = async () => {
    return new Promise ((resolve, reject) => {
      if (this.ethAddress && this.indexedDBAvailable) {
        const request = window.indexedDB.open('VECTOR_COINS', 1);
        let db;
        
        request.onerror = (e) => {
          reject("Initial indexedDB request error: ", request.error)
        }
  
        request.onupgradeneeded = function(event) {
          var db = event.target.result;
          var store = db.createObjectStore('coin_ranges', {keyPath: 'rangeStart',autoIncrement: true});
          store.createIndex('account_id_unique', 'id', {unique: true});
        };
  
        request.onsuccess = (e) => {
          db = e.target.result; // Database instance from browser
    
          var transaction = db.transaction('coin_ranges', 'readwrite'); // create transaction
    
          transaction.onsuccess = e => {
            console.log('IndexedDB transaction succesful');
          };
          
          transaction.onerror = e => {
            console.log('IndexedDB transaction failed with error');
          };
          
          transaction.onabort = e => {
            console.log("IndexedDB transaction aborted")
          };
    
          resolve(transaction.objectStore('coin_ranges'));
        }
      } else {
        reject("No address or no access to indexedDB")
      }
    })
  }

  add = (store, coin) => {
    return new Promise((resolve, reject) => {
      var data = {
        rangeStart: coin[0],
        rangeEnd: coin[1],
        block: coin[2]
      }
      console.log(data)
      var db_op_req = store.add(data); // IDBRequest
      
      db_op_req.onsuccess = function(event) {
        resolve("address and time added"); // true
      };
  
      db_op_req.onerror = function(event) {
        reject("something went wrong whilst adding address and time")
      };
    })
  }

  get = (store, v) => {
    return new Promise((resolve, reject) => {
      var db_op_req = store.get(v); // IDBRequest
    
      db_op_req.onsuccess = function(event) {
        console.log("Store get request completed"); // true
        resolve(event.target.result);
      };
  
      db_op_req.onerror = function(event) {
        reject("Store get request failed")
      };
    })

  }
  
  getAllKeys = (store) => {
    return new Promise((resolve, reject) => {
      var db_op_req = store.getAllKeys(); // IDBRequest
    
      db_op_req.onsuccess = function(event) {
        console.log("Store key request completed"); // true
        resolve(event.target.result);
      };
  
      db_op_req.onerror = function(event) {
        reject("Store key request failed")
      };
    })

  }
  
  put = (store, coin) => {
    return new Promise((resolve, reject) => {
      var data = {
        rangeStart: coin[0],
        rangeEnd: coin[1],
        block: coin[2]
      }
      
      var db_op_req = store.put(data); // IDBRequest
      
      db_op_req.onsuccess = function(event) {
        resolve("address and time updated"); // true
      };
  
      db_op_req.onerror = function(event) {
        reject("something went wrong whilst updating address and time")
      };
    })
  }

  remove = (store, coin) => {
    return new Promise((resolve, reject)=> {
      var db_op_req = store.delete(coin.rangeStart)

      db_op_req.onsuccess = function(event) {
        resolve("address and time updated"); // true
      };
  
      db_op_req.onerror = function(event) {
        reject("something went wrong whilst updating address and time")
      };
    })
  }
}
