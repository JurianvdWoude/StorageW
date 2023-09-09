
class Cookies {	
	/**
	 * @typedef {Object} Cookie
	 * @property {string} id - The identifier of the cookie
	 * @property {string} type - The type of the cookie string
	 * @property {string|any[]} value - The value stored inside the cookie
	 */

	/**
	 * Gets the stored Cookie and returns them 
	 * either as an array of {@link Cookie} objects or as an empty array 
	 * when no cookies are found.
	 * 
	 * The returned {@link Cookie} objects look like this: { id: string , type: string, value: string }.
	 * 
	 * @example
	 * 	const cached_info = Cookies.all()
	 *                    .filter(cookie => cookie.name === 'cache')
	 *                    .match(cookie => cookie.value)
	 * 
	 * @returns {Cookie[]} An array of {@link Cookie} objects.
	 */
	static all() {
		if(!navigator.cookieEnabled) {
			console.error('Cookies aren\'t enabled.');
			return [];
		}
		let cookies = document.cookie;
		if(cookies.trim() === '') return [];
		return cookies
			.split(';')
			.map(cookie => {
				let id = cookie.split('=')[0].trim();
				let value = cookie.substring(cookie.indexOf('=') + 1).trim();
				return {
					id: id,
					type: 'string',
					value: value
				}
			});
	}

	/**
	 * Returns the first instance of a stored {@link Cookie}. Returns null 
	 * if no cookie was found to match the id.
	 * 
	 * The returned {@link Cookie} objects look like this: { id: string , type: string, value: string }.
	 * 
	 * @param {string|RegExp} query 
	 *  Searches for the Cookie with this string or regex query.
	 * 
	 * @example
	 * 	const stored_name = Cookies.first(\[A-Za-z]\);
	 * 	const stored_date = Cookies.first("date");
	 * 
	 * @returns {Cookie|null} The first {@link Cookie} value it finds.
	 */
	static first(query) {
		const cookies = Cookies.all();
		if(cookies.length) {
			if(Number.isInteger(query)) {
				if(query >= 0 && query < cookies.length) {
					return cookies[query];
				}
				if(query < 0 && query > -cookies.length) {
					return cookies[cookies.length + query]
				}
			} 
			if(typeof query === "string") {
				const filteredCookies = cookies.filter(item => item.id === query);
				if(filteredCookies.length) return filteredCookies[0];
			}
			if(typeof query === "object" && query instanceof RegExp) {
				const filteredCookies = cookies.filter(item => query.test(item.id));
				if(filteredCookies.length) return filteredCookies[0];
			}
		}
		return null;
	}

	static firstIn(cookies, query) {
		if(
			Array.isArray(cookies) &&
			cookies.length &&
			cookies.every(cookie => {
				typeof cookie === "object" && 
				Object.hasOwn(cookie, 'id') && 
				Object.hasOwn(cookie, 'value') &&
				typeof cookie['id'] === 'string' &&
				(
					typeof cookie['value'] === 'string' ||
					typeof cookie['value'] == 'object'
				)
			})
		) {
			if(Number.isInteger(query)) {
				if(query >= 0 && query < cookies.length) {
					return cookies[query];
				}
				if(query < 0 && query > -cookies.length) {
					return cookies[cookies.length + query]
				}
			} 
			if(typeof query === "string") {
				const filteredCookies = cookies.filter(item => item.id === query);
				if(filteredCookies.length) return filteredCookies[0];
			}
			if(typeof query === "object" && query instanceof RegExp) {
				const filteredCookies = cookies.filter(item => query.test(item.id));
				if(filteredCookies.length) return filteredCookies[0];
			}
		}
		return null;
	}

	/**
	 * Checks whether a Cookie exists with an id which matches the query.
	 * If it exists, returns true.
	 * if no Cookie was found to match the id, it returns false.
	 * 
	 * @param {string|RegExp} query 
	 *  Searches for Cookies with this string or regex expression.
	 * 
	 * @example
	 * 	const filtered_values = Cookies.find(\[A-Za-z]\)
	 *                        	.map(cookie => cookie.name)
	 * 
	 * @returns {boolean} Whether a cookie exists with a matching id.
	 */
	static has(query) {
		let cookie = Cookies.first(query);
		if(cookie && cookie['value']) return true;
		return false;
	}

	/**
	 * Finds all Cookies matching the query and returns an array of 
	 * {@link Cookie} objects. Returns null 
	 * if no Cookie was found to match the id.
	 * 
	 * The returned {@link Cookie} objects look like this: { id: string , type: string, value: string }.
	 * 
	 * @param {string|RegExp} query 
	 *  Searches for Cookies with this string or regex expression.
	 * 
	 * @example
	 * 	const filtered_values = Cookies.find(\[A-Za-z]\)
	 *                        	.map(cookie => cookie.name)
	 * 
	 * @returns {Cookie[]|null} An array of found {@link Cookie} objects.
	 */
	static find(query) {
		const cookies = Cookies.all();
		if(cookies.length) {
			if(Number.isInteger(query)) {
				if(query >= 0 && query < cookies.length) {
					return [cookies[query]];
				}
				if(query < 0 && query > -cookies.length) {
					return [cookies[cookies.length + query]]
				}
			} 
			if(typeof query === "string") {
				const filteredCookies = cookies.filter(item => item.id === query);
				if(filteredCookies.length) return filteredCookies;
			}
			if(typeof query === "object" && query instanceof RegExp) {
				const filteredCookies = cookies.filter(item => query.test(item.id));
				if(filteredCookies.length) return filteredCookies;
			}
		}
		return null;
	}

	static findIn(cookies, query) {
		if(
			Array.isArray(cookies) &&
			cookies.length &&
			cookies.every(cookie => {
				typeof cookie === "object" && 
				Object.hasOwn(cookie, 'id') && 
				Object.hasOwn(cookie, 'value') &&
				typeof cookie['id'] === 'string' &&
				(
					typeof cookie['value'] === 'string' ||
					typeof cookie['value'] == 'object'
				)
			})
		) {
			if(Number.isInteger(query)) {
				if(query >= 0 && query < cookies.length) {
					return [cookies[query]];
				}
				if(query < 0 && query > -cookies.length) {
					return [cookies[cookies.length + query]]
				}
			} 
			if(typeof query === "string") {
				const filteredCookies = cookies.filter(item => item.id === query);
				if(filteredCookies.length) return filteredCookies;
			}
			if(typeof query === "object" && query instanceof RegExp) {
				const filteredCookies = cookies.filter(item => query.test(item.id));
				if(filteredCookies.length) return filteredCookies;
			}
		}
		return null;
	}

	static store(item) {
		let hasAddedCookies = false;
		if(
			typeof item === "object" && 
			Object.hasOwn(item, 'id') && 
			Object.hasOwn(item, 'value') &&
			typeof item['id'] === 'string' &&
			typeof item['value'] === 'string'
		) {
			let cookies = document.cookie;
			let addedCookie = `${item.id}=${item.value}`;
			if(cookies.trim() === '') cookies = cookies + addedCookie;
			else cookies = cookies + ';' + addedCookie;
			document.cookie = cookies;
			hasAddedCookies = true;
		}
		return hasAddedCookies;
	}

	static storeArray(items) {
		let numberOfItems = 0;
		let numberOfAddedCookies = 0;
		if(
			typeof items === 'object' &&
			Array.isArray(items) &&
			items.length > 0 &&
			items.every(item => {return(
				typeof item === 'object' &&
				Object.hasOwn(item, 'id') && 
				Object.hasOwn(item, 'value') &&
				typeof item['id'] === 'string' &&
				typeof item['value'] === 'string'
			)})
		) {
			numberOfItems = items.length;
			let cookies = document.cookie;
			items.forEach(item => {
				numberOfAddedCookies += 1;
				let addedCookie = `${item.id}=${item.value}`;
				if(cookies.trim() === '') cookies = addedCookie;
				else cookies = cookies + ';' + addedCookie;
			})

			if(numberOfItems === numberOfAddedCookies) {
				document.cookie = cookies;
				return true;
			}
		}
		console.error(`Error: Tried to add ${numberOfItems} cookies, but added ${numberOfAddedCookies} cookies instead.`)
		return false;
	}

	static storeAsContainer(item) {
		let hasAddedCookies = false;
		if(
			typeof item === "object" && 
			Object.hasOwn(item, 'id') && 
			Object.hasOwn(item, 'value') &&
			typeof item['id'] === 'string' &&
			typeof item['value'] === 'object' &&
			Array.isArray(item['value']) &&
			item['value'].length > 0 &&
			item['value'].every(subcookie => { return (
				typeof subcookie === 'object' &&
				Object.hasOwn(subcookie, 'id') && 
				Object.hasOwn(subcookie, 'value') &&
				typeof subcookie['id'] === 'string' &&
				typeof subcookie['value'] === 'string'
			)})
		) {
			let cookies = document.cookie;
			let numberOfAddedSubCookies = 0;
			let subCookies = item['value'];
			let subCookieCount = subCookies.length;
			let subCookieString = '';
			subCookies.forEach(subCookie => {
				numberOfAddedSubCookies += 1;
				let addedSubCookie = `${subCookie.id}=${subCookie.value}`;
				if(subCookieString.trim() === '') subCookieString = addedSubCookie;
				else subCookieString = subCookieString + '&' + addedSubCookie;
			})
			if(subCookieCount === numberOfAddedSubCookies) {
				let cookie = item['id'] + '=' + subCookieString;
				document.cookie = cookies + cookie;
				return true;
			}
		}
		return hasAddedCookies;
	}

	static storeAsJSON(item) {
		let hasAddedCookies = false;
		if(
			typeof item === "object" && 
			Object.hasOwn(item, 'id') && 
			Object.hasOwn(item, 'value') &&
			typeof item['id'] === 'string' 
		) {
			try {
				let stringifiedCookie = JSON.stringify(item.value)
				return Cookies.store({
					id: item.id,
					value: stringifiedCookie,
				});
			} catch(e) {
				console.error('Error: wasn\'t able to stringify cookie', e);
				return hasAddedCookies;
			}
		}
		return hasAddedCookies;
	}


	static storeArrayAsJSON(items) {
		let numberOfItems = 0;
		let numberOfAddedCookies = 0;
		if(
			typeof items === 'object' &&
			Array.isArray(items) &&
			items.length > 0 &&
			items.every(item => {return(
				typeof item === 'object' &&
				Object.hasOwn(item, 'id') && 
				Object.hasOwn(item, 'value') &&
				typeof item['id'] === 'string' &&
				(
					typeof item['value'] === 'object' ||
					typeof item['value'] === 'string'
				)
			)})
		) {
			numberOfItems = items.length;
			let cookies = document.cookie;
			items.forEach((item, index) => {
				let stringifiedCookie = undefined;
				try {
					stringifiedCookie = JSON.stringify(item.value);
				} catch(e) {
					stringifiedCookie = item.value;
					console.error(`Error: wasn\'t able to stringify cookie with index ${index}.`, e);
				} finally {
					let stored = Cookies.store({
						id: item.id,
						value: stringifiedCookie,
					});
					if(stored) numberOfAddedCookies += 1;
				}
			})
			document.cookie = cookies;
		}
		if(numberOfItems === numberOfAddedCookies) {
			return true;
		}

		console.error(`Error: Tried to add ${numberOfItems} cookies, but added ${numberOfAddedCookies} cookies instead.`)
		return false;
	}


	/**
	 * The parameter (cookieType) is an optional value, which tells the unravel() function whether to only do specific checks on cookie values.
	 * 
	 * cookieType = 'all':
	 * * This is the default behavior. 
	 * * If no parameter is set, the unravel() function will revert to this option.
	 * * First checks whether a cookie's value is json (see cookieType = "json"), if not it will check if it can be split into an array of "sub-cookies" (see cookieType = "container")
	 * 
	 * cookieType ='json':
	 * * Only checks whether the value of a cookie object is a json.
	 * * If it is a json string, it will parse it, and store it as the cookie's value.
	 * * The cookie's type is set to 'json'
	 * 
	 * cookieType = 'container':
	 * * Only checks whether the value of a cookie object can be split further. Splitting into an array of "sub-cookies" happens on the '&' character.
	 * * If it can be split, it stores the array of "sub-cookies" in the original cookie (its parent cookie) as the value property.
	 * * the parent cookie's type is set to 'container'
	 * * the types of all "sub-coookies" are "string".
	 * 
	 * *
	 * 
	 * @example 
	 * let metaData = Cookies.firstIn(Cookies.unravel(), 'meta');
	 * if(metaData.type === 'container') {
	 * 	let dates = Cookies.findIn(metaData.value, 'date');
	 * 	return dates;
	 * } else {
	 * 	return metaData;
	 * }
	 * 
	 * 
	 * @param {'all'|'none'|'json'|'container'} cookieType The type of cookies that are stored. If left empty, unravel() checks each cookie for everything.
	 * @returns {Cookie[]} An array of {@link Cookie} objects.
	 */
	static unravel(cookieType = 'all') {
		const cookies = Cookies.all();
		let checkedCookies = cookies;

		if(
			typeof cookieType !== 'string' && 
			!['all'|'none'|'json'|'container'].includes(cookieType)
		) {
			return console.error('Set a cookieType, but it isn\'t set as one of the permissible values ("all", "none", "json", "container") or left empty.')
		}

		if(
			cookieType !== 'string' && 
			cookieType !== 'container'
		) {
			checkedCookies = checkedCookies.map(cookie => {
				try {
					let parsedValue = JSON.parse(cookie.value)
					return {
						id: cookie.id,
						type: parsedType,
						value: parsedValue,
					};
				} catch(e) {
					return cookie;
				}
			});
		}

		if(
			cookieType !== 'string' && 
			cookieType !== 'json'
		) {
			checkedCookies = checkedCookies.map(cookie => {
				if(
					typeof cookie.value === 'string' &&
					cookie.value.indexOf('=') !== -1 &&
					cookie.value.indexOf('&') !== -1 &&
					cookie.value.split('&').every(i => i.split('=').length === 2)
				) {
					return {
						id: cookie.id,
						type: 'container',
						value: cookie.value
						  .split('&')
							.map(value => {
								if(value.indexOf('=') !== -1) {
									return {
										id: value.split('=')[0],
										type: 'string',
										value: value.substring(value.indexOf('=') + 1).trim()
									}
								} else {
									return {
										id: value,
										type: 'string',
										value: '',
									};
								}
						})
					}
				}
				return cookie;
			})
		}
		return checkedCookies;
	}
}

class Storage {
	async size() {
		if('storage' in window.navigator) {
			return await window.navigator.storage.estimate();
		}
		return await new Promise(null);
	}

	async store() {
		this.size()
			.then(r => { return {
				quota: r?.quota,
				usage: r?.usage,
		}})
			.then()
	}
}

class DB {
	#action;
	#error;
	#db;
	#request;
	#class;
	#classProps;
	#store;
	#transaction;

	constructor(name, config = {
		version: version = undefined, 
		saveDataCallback: saveDataCallback = async function(){ return true; },
		shallSaveOnClose: shallSaveOnClose = true,
	}) {
		if(typeof name !== 'string' || name === '') {
			name = window.location.pathname.replaceall('/', '');
			if(name === '') name = window.location.host.split('.')[0];
		}

		if(typeof config.version !== 'number') {
			config.version = undefined;
		}

		if(typeof config.saveDataCallback !== 'function') {
			config.saveDataCallback = async function(){ return true; };
		}

		if(typeof config.shallSaveOnClose !== 'boolean') {
			config.shallSaveOnClose = true;
		}

		if(!indexedDB) {
			var indexedDB = window.indexedDB || 
				window.webkitIndexedDB ||
				window.mozIndexedDB || 
				window.msIndexedDB;
		}

		this.dbName = name;
		this.dbVersion = version;
		this.config = config;
		this.#action = 'init';
		this.#class = null;
		this.#store = null;
		this.#request = null;

		if(indexedDB) {
			this.#request = indexedDB.open(name, version);
		} else {
			this.#request = null;
		}
	}

	async create(Store) {
		if(
			typeof Store === 'function' &&
			Store instanceof Function &&
			Store.hasOwnProperty('name') && 
			Store.hasOwnProperty('length') &&
			Store.toString().substring(0, 5) === 'class'
		) {
			let className = Store.name;
			let classSize = Store.length;
			let classProperties = Object.getOwnPropertyNames(new Store);
			let classDescriptors = Object.getOwnPropertyDescriptors(new Store);
			if(
				classPropertyAmount > 0 && 
				classProperties.length === classSize
			) {
				this.#class = Store;
				this.#classProps = {
					name: className,
					length: classSize,
					properties: classProperties
				}

				let db;

				this.#request.onupgradeneeded = function() {
					db = this.result;
					const store = db.createObjectStore(className, {keyPath: "id"});
					classProperties.forEach(prop => {
						store.createIndex(prop, prop, classDescriptors[i]?.value === 'unique');
					})
				}
			}
		}
	}

	update(store) {
		if(
			typeof store === 'object' &&
			store instanceof this.#class
		) {
			let transaction = this.#db.transaction(this.#classProps.name, "readwrite");
			const store = transaction.objectStore(this.#classProps.name);
			if(!store.hasOwnProperty('id')) {
				store[id]
			}
			store.put()
		}
	}

	// update(index) {
	// 	if(
	// 		this.#store &&
	// 		this.#class &&
	// 		typeof index === 'object' && 
	// 		index instanceof this.#class
	// 	) {
	// 		let entries = Object.entries(index);
	// 	}
	// }
}

