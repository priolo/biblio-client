/* eslint eqeqeq: "off"*/

import { getTypeAndId } from "store/element"


const store = {
	state: {
		url: "",
	},
	getters: {

		getSearchUrl: (state, name, store) => {
			const searchParams = new URLSearchParams(window.location.search)
			return searchParams.get(name)
		},

		getArray: (state, name, store) => {
			const props = store.getSearchUrl(name)
			return props ? props.split("-") : []
		},

		getHash: (state, _, store) => {
			const hash = window.location.hash
			return hash.slice(1)
		},

		getElements: (state, _, store) => {
			const identities = store.getArray("i")
			const elements = identities.map ( identity => {
				const { type, id } = getTypeAndId(identity)
				return { identity, type, id }
			})
			return elements
		},

		haveIdentity: (state, identity, store ) => {
			const identities = store.getArray("i")
			return identities.includes(identity)
		},

	},
	actions: {
	},
	mutators: {

		setSearchUrl: (state, { name, value }, store) => {
			const queryParams = new URLSearchParams(window.location.search)
			if (value && value.toString().length > 0) {
				queryParams.set(name, value)
			} else {
				queryParams.delete(name)
			}
			window.history.replaceState(null, null, "?" + queryParams.toString())
			return { url: queryParams.toString() }
		},

		setArray: (state, { name, value }, store) => {
			const valueStr = Array.isArray(value) && value.length>0 ? value.join("-") : null
			return store.setSearchUrl({ name, value: valueStr})
		},

		setHash: (state, hash, store) => {
			window.location.hash = `#${hash}`
			return { url: window.location.href }
		},
	},
}

export default store

