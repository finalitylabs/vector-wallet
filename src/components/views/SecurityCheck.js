export default class SecurityCheck {
	constructor(web3) {
		this.ethAddress = web3.address;
		this.indexedDBAvailable = window.indexedDB;
	}

	init = async () => {
		return new Promise ((resolve, reject) => {
			if (this.ethAddress && this.indexedDBAvailable) {
				const request = window.indexedDB.open('VECTOR_SECURITY_CHECK', 1);
				let db;
				
				request.onerror = (e) => {
					reject("Initial indexedDB request error: ", request.error)
				}
	
				request.onupgradeneeded = function(event) {
					var db = event.target.result;
					var store = db.createObjectStore('security_checks', {keyPath: 'address',autoIncrement: true});
					store.createIndex('account_id_unique', 'id', {unique: true});
				};
	
				request.onsuccess = (e) => {
					db = e.target.result; // Database instance from browser
		
					var transaction = db.transaction('security_checks', 'readwrite'); // create transaction
		
					transaction.onsuccess = e => {
						console.log('IndexedDB transaction succesful');
					};
					
					transaction.onerror = e => {
						console.log('IndexedDB transaction failed with error');
					};
					
					transaction.onabort = e => {
						console.log("IndexedDB transaction aborted")
					};
		
					resolve(transaction.objectStore('security_checks'));
				}
			} else {
				reject("No address or no access to indexedDB")
			}
		})
	}

	add = (store, data) => {
		return new Promise((resolve, reject) => {
			var data = {
				address: this.ethAddress,
				last_check_time: new Date().getTime()
			}
			
			var db_op_req = store.add(data); // IDBRequest
			
			db_op_req.onsuccess = function(event) {
				resolve("address and time added"); // true
			};
	
			db_op_req.onerror = function(event) {
				reject("something went wrong whilst adding address and time")
			};
		})
	}

	get = (store) => {
		return new Promise((resolve, reject) => {
			var db_op_req = store.get(this.ethAddress); // IDBRequest
		
			db_op_req.onsuccess = function(event) {
				console.log("Store get request completed"); // true
				resolve(event.target.result);
			};
	
			db_op_req.onerror = function(event) {
				reject("Store get request failed")
			};
		})

	}
	
	put = (store) => {
		return new Promise((resolve, reject) => {
			var data = {
				address: this.ethAddress,
				last_check_time: new Date().getTime()
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
}
