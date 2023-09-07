
class Cookies {	
	/**
	 * @typedef {Object} Cookie
	 * @property {string} id - The identifier of the cookie
	 * @property {string} value - The value stored inside the cookie
	 */

	/**
	 * Gets the stored Cookie and returns them 
	 * either as an array of {@link Cookie} objects or as an empty array 
	 * when no cookies are found.
	 * 
	 * {@link Cookie} objects look like this: { id: string , value: string }.
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
					value: value
				}
			});
	}

	/**
	 * Returns the first instance of a stored {@link Cookie}. Returns null 
	 * if no cookie was found to match the id.
	 * 
	 * {@link Cookie} objects look like this: { id: string , value: string }.
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
		const cookies = this.all();
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
		let cookie = this.first(query);
		if(cookie && cookie['value']) return true;
		return false;
	}

	/**
	 * Finds all Cookies matching the query and returns an array of 
	 * {@link Cookie} objects. Returns null 
	 * if no Cookie was found to match the id.
	 * 
	 * {@link Cookie} objects look like this: { id: string , value: string }.
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
		const cookies = this.all();
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

	static storeAll(items) {
		let numberOfItems = 0;
		let numberOfAddedCookies = 0;
		if(
			typeof items === 'object' &&
			items instanceof Array &&
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
				if(cookies.trim() === '') cookies = cookies + addedCookie;
				else cookies = cookies + ';' + addedCookie;
			})
			document.cookie = cookies;
		}
		if(numberOfItems > 0 && numberOfItems === numberOfAddedCookies) {
			return true;
		}
		if(numberOfItems > 0) {
			console.error(`Error: Tried to add ${numberOfItems} cookies, but added ${numberOfAddedCookies} cookies instead.`)
		} else {
			console.error(`Error: Failed to add Cookies. Did you add more that one or is the Cookie object mismatched?`)
		}
		return false;
	}

	static storeAsJSON(item) {
		if(
			typeof item === "object" && 
			Object.hasOwn(item, 'id') && 
			Object.hasOwn(item, 'value') &&
			typeof item['id'] === 'string' 
		) {
			try {
				let stringifiedCookie = JSON.stringify(item.value)
				return store({
					id: item.id,
					value: stringifiedCookie,
				});
			} catch(e) {
				console.error('Error: wasn\'t able to stringify cookie', e);
				return false;
			}
		}
		return false;
	}

	static unravel() {
		const cookies = this.all();
		let checkedCookies = cookies.map(cookie => {
			try {
				let parsedValue = JSON.parse(cookie.value)
				return {
					id: cookie.id,
					value: parsedValue,
				};
			} catch(e) {
				return cookie;
			}
		});
		return checkedCookies;
	}
}

class DB {
	#action;
	#error = null;
	#request = null;
	#class;
	#store;

	constructor(name, version = undefined) {
		if(typeof name !== 'string' || name === '') {
			return null;
		}

		if(typeof version !== 'number') {
			version = undefined;
		}

		this.dbName = name;
		this.dbVersion = version;
		this.#action = 'init';
		this.#class = null;
		this.#store = null;


		if(!indexedDB) {
			var indexedDB = window.indexedDB || 
				window.webkitIndexedDB ||
				window.mozIndexedDB || 
				window.msIndexedDB;
		}

		if(indexedDB) {
			this.#request = indexedDB.open(name, version);
		} else {
			this.#request = null;
		}
	}

	create(store) {
		if(
			typeof store === 'function' &&
			store.prototype
		) {
			this.#class = store;
		}
	}

	update(index) {
		if(
			this.#store &&
			this.#class &&
			typeof index === 'object' && 
			index instanceof this.#class
		) {
			let entries = Object.entries(index);
		}
	}
}

