/* eslint eqeqeq: "off" */
import { ELEMENT_TYPE, getTypeAndId } from "."
import { getStoreUrl } from "../url"

/**
 * Sono tutti gli elementi presenti
 */
const store = {
	state: {
	},
	getters: {
		
	},
	actions: {

		/**
		 * Inserisce un ELEMENT tramite il suo ID
		 */
		open: async (state, identity, store) => {
			const { getArray, setArray, setHash } = getStoreUrl()
			let identities = getArray("i")

			if (!identities.includes(identity)) {
				identities.push(identity)
				setArray({ name: "i", value: identities })
				//store.update()
			}

			setHash(identity)
		},

		/**
		 * Elimina un ELEMENT dalla lista in base all'ID
		 */
		 close: async (state, identity, store) => {
			const { getArray, setArray } = getStoreUrl()
			const identities = getArray("i")
			let newIdentities = identities.filter(id => id != identity)
			setArray({ name: "i", value: newIdentities })
			//store.update()
		},

	},
	mutators: {
	},
}

export default store

