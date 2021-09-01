/* eslint eqeqeq: "off"*/

import { getTypeAndId } from "store/element"

const DIV_PROP = "-"
const DIV_SUB = "."

const store = {
	state: {
		url: "",
	},
	init: (store) => {
		window.addEventListener( "popstate",  function(event) {
			const { url } = store.state
			store.setUrl( window.location.href )
		})
	},
	getters: {

		getSearchUrl: (state, name, store) => {
			const searchParams = new URLSearchParams(window.location.search)
			return searchParams.get(name)
		},
		
		getArray: (state, name, store) => {
			const props = store.getSearchUrl(name)
			return props ? props.split(DIV_PROP) : []
		},

		getHash: (state, _, store) => {
			const hash = window.location.hash
			return hash.slice(1)
		},

		getElements: (state, _, store) => {
			const identities = store.getArray("i")
			const elements = identities.map(identity => {
				const { type, id } = getTypeAndId(identity)
				return { identity, type, id }
			})
			return elements
		},

		haveIdentity: (state, identity, store) => {
			const identities = store.getArray("i")
			return identities.includes(identity)
		},

	},
	actions: {

		addIdentity: async (state, { identity, rightOf, focus }, store) => {
			let identities = store.getArray("i")
			let index = rightOf ? identities.indexOf(rightOf) + 1 : -1
			if (index == -1) index = 0 // identities.length
			if (!identities.includes(identity)) {
				identities.splice(index, 0, identity)
				store.setArray({ name: "i", value: identities })
			}
			if (focus) await store._syncAct(store.setHash, identity)
		},
		removeIdentity: (state, identity, store) => {
			const identities = store.getArray("i")
			let newIdentities = identities.filter(id => id != identity)
			store.setArray({ name: "i", value: newIdentities })
		},
		toggleIdentity: (state, options, store) => {
			const { identity } = options
			if (store.haveIdentity(identity)) {
				store.removeIdentity(identity)
			} else {
				store.addIdentity(options)
			}
		},





		setArray: (state, { name, value }, store) => {
			const valueStr = Array.isArray(value) && value.length > 0 ? value.join(DIV_PROP) : null
			return store.setParam({ name, value: valueStr })
		},

		setParam: (state, { name, value }, store) => {
			const queryParams = new URLSearchParams(window.location.search)
			if (value && value.toString().length > 0) {
				queryParams.set(name, value)
			} else {
				queryParams.delete(name)
			}
			const search = "?" + queryParams.toString()
			store.composeUrl ( {search })
		},

		setHash: (state, hash, store) => {
			store.composeUrl( { hash: "#" + hash })
		},

		composeUrl: (state, { search, hash }, store ) => {
			const urlSearch = search ?? window.location.search
			const urlHash = hash ?? window.location.hash
			const url = window.location.origin + window.location.pathname + urlSearch + urlHash
			window.history.pushState(null, null, url)
			store.setUrl ( url )
		},

	},
	mutators: {

		setUrl: (state, url, store) => { 
			return url 
		},

	},
}

export default store

