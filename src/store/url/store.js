/* eslint eqeqeq: "off"*/

import { decomposeIdentity, getIdentities, getUrlHash, haveIdentity, indexIdentity } from "store/url"

const DIV_PROP = "-"
const DIV_SUB = "."

const store = {
	state: {
		url: "",
	},
	init: (store) => {
		window.addEventListener("popstate", (e) => {
			store.setUrl(window.location.href)
		})
		document.addEventListener("keydown", (e) => {
			const identities = getIdentities()
			switch (e.code) {
				case "Tab":
					let index = indexIdentity(getUrlHash())
					index += e.shiftKey ? -1 : +1
					if ( index >= identities.length ) index = 0 
					if ( index < 0 ) index = identities.length -1
					store.setHash(identities[index])
					break
			}
		})
	},
	getters: {

		getElements: (state, _, store) => {
			const identities = getIdentities()
			const elements = identities.map(identity => decomposeIdentity(identity))
			return elements
		},

	},
	actions: {

		addIdentity: async (state, { identity, by = "level", rightOf, focus }, store) => {
			let identities = getIdentities()

			// dove lo metto?
			let index = 0
			if (by == "level") {
				const element = decomposeIdentity(identity)
				index = identities.findIndex(idn => {
					const elm = decomposeIdentity(idn)
					return elm.level >= element.level
				})
				if (index == -1) index = identities.length

			} else {
				index = rightOf ? indexIdentity(rightOf) + 1 : -1
				if (index == -1) index = 0 // identities.length	
			}

			// lo metto
			if (!haveIdentity(identity)) {
				identities.splice(index, 0, identity)
				store.setArray({ name: "i", value: identities })
			}

			// setto anche il fuoco?
			if (focus) await store._syncAct(store.setHash, identity)
		},
		removeIdentity: (state, identity, store) => {
			const identities = getIdentities()
			let newIdentities = identities.filter(id => id != identity)
			store.setArray({ name: "i", value: newIdentities })
			if (getUrlHash() == identity) {
				store.setHash()
			}
		},
		toggleIdentity: (state, options, store) => {
			const { identity } = options
			if (haveIdentity(identity)) {
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
			store.composeUrl({ search })
		},

		setHash: (state, hash, store) => {
			store.composeUrl({ hash: hash ? `#${hash}` : "" })
		},

		composeUrl: (state, { search, hash }, store) => {
			const urlSearch = search ?? window.location.search
			const urlHash = hash ?? window.location.hash
			const hashChanged = urlHash != window.location.hash
			const searchChanged = urlSearch != window.location.search

			if (!searchChanged && !hashChanged) return

			const url = urlSearch + urlHash
			// if( hashChanged && !searchChanged ) {
			window.history.pushState(null, null, url)
			// } else {
			//	window.history.replaceState(null, null, url)
			// }

			store.setUrl(url)
		},

	},
	mutators: {

		setUrl: (state, url, store) => ({ url }),

	},
}

export default store

