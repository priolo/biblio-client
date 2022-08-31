/* eslint eqeqeq: "off"*/

import { createStore } from "@priolo/jon"
import { getElementStore } from "store/doc"
import storeTypeDialog from "store/doc/dialogs/type"
import { decomposeIdentity, getUrlIdentities, getUrlHash, haveIdentity, indexIdentity, ELEMENT_TYPE, DIV_PROP } from "store/url/utils"


const setup = {
	state: {
		url: "",
	},
	getters: {

		getElements: () => {
			const identities = getUrlIdentities()
			const elements = identities.map(identity => decomposeIdentity(identity))
			return elements
		},

	},
	actions: {

		/**
		 * Aggiunge un ELEMENT alla collezione di documenti visualizzati
		 * @param {*}
		 * @param {import("store/url/utils").pAddIdentity} param1 
		 */
		addIdentity: async ({ identity, by = "level", rightOf, focus }, store) => {
			let identities = getUrlIdentities()

			// indice dove mettere questo nuovo doc
			let index = 0

			// se è per "level"...
			if (by == "level") {
				const element = decomposeIdentity(identity)
				index = identities.findIndex(idn => {
					const elm = decomposeIdentity(idn)
					return elm.level >= element.level
				})
				if (index == -1) index = identities.length

				// se non è per "level" allora controllo "righOf"
			} else {
				index = rightOf ? indexIdentity(rightOf) + 1 : -1
				if (index == -1) index = 0 // identities.length	
			}

			// ok! se non c'e' gia' lo metto!
			if (!haveIdentity(identity)) {
				identities.splice(index, 0, identity)
				store.setArray({ name: "i", value: identities })
			}

			// setto anche il fuoco?
			if (focus) await store.setHash(identity)
		},

		/** Elimina un elemento gia' presente tra i doc visualizzati */
		removeIdentity: (identity, store) => {
			const { type } = decomposeIdentity(identity)
			switch (type) {
				case ELEMENT_TYPE.DOC:
					// avverto lo store che sto chiudendo l'ELEMENT
					const { onClose } = getElementStore(identity)
					onClose?.()
					const { close } = storeTypeDialog
					close()
					break
			}

			// resetto le identity nell'URL togliendo quella eliminata
			const identities = getUrlIdentities()
			let newIdentities = identities.filter(id => id != identity)
			store.setArray({ name: "i", value: newIdentities })
			if (getUrlHash() == identity) {
				store.setHash()
			}
		},
		/**
		 * Molto semplice: se c'e' gia' un ELEMENT lo cancello altrimenti lo creo
		 * @param {import("store/url/utils").pAddIdentity} options 
		 */
		toggleIdentity: (options, store) => {
			const { identity } = options
			if (haveIdentity(identity)) {
				store.removeIdentity(identity)
			} else {
				store.addIdentity(options)
			}
		},

		setArray: ({ name, value }, store) => {
			const valueStr = Array.isArray(value) && value.length > 0 ? value.join(DIV_PROP) : null
			return store.setParam({ name, value: valueStr })
		},

		setParam: ({ name, value }, store) => {
			const queryParams = new URLSearchParams(window.location.search)
			if (value && value.toString().length > 0) {
				queryParams.set(name, value)
			} else {
				queryParams.delete(name)
			}
			const search = "?" + queryParams.toString()
			store.composeUrl({ search })
		},

		setHash: (hash, store) => {
			store.composeUrl({ hash: hash ? `#${hash}` : "" })
		},

		composeUrl: ({ search, hash }, store) => {
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

		setUrl: url => ({ url }),

	},
}

const store = createStore(setup)

window.addEventListener("popstate", (e) => {
	store.setUrl(window.location.href)
})
document.addEventListener("keydown", (e) => {
	const identities = getUrlIdentities()
	switch (e.code) {
		case "Tab":
			let index = indexIdentity(getUrlHash())
			index += e.shiftKey ? -1 : +1
			if (index >= identities.length) index = 0
			if (index < 0) index = identities.length - 1
			store.setHash(identities[index])
			break
	}
})

export default store