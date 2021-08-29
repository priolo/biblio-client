/* eslint eqeqeq: "off" */
import { ELEMENT_TYPE } from "."
import { getStoreUrl } from "../url"

/**
 * Sono tutti gli elementi presenti
 */
const store = {
	state: {
		all: [],
		focus: null,
	},
	getters: {
		getIndexById: (state, id, store) => state.all.findIndex(doc => doc.id == id),
		getAllByType: (state, type, store) => state.all.filter(doc => doc.type == type)
	},
	actions: {

		fetch: async (state, _, store) => {
		},

		// inserisce un doc in testa
		open: async (state, id, store) => {
			const { getArray, setArray } = getStoreUrl()

			const docIds = getArray("d")
			if (docIds.includes(id)) {
				console.log("ce sta gia'")
				return
			}
			docIds.push(id)
			setArray({ name: "d", value: docIds })

			store.update()
		},

		update: async (state, _, store) => {
			const { getArray } = getStoreUrl()
			const docIds = getArray("d")
			const { all } = state
			const docsUpdate = []

			for ( const id of docIds ) {
				const doc = all.find(doc => doc.id == id)
				docsUpdate.push(doc?? await store.build(id) )
			}

			store.setAll(docsUpdate)
		},

		build: async (state, identity, store) => {
			const { all } = state
			let element = null
			const [type, id] = identity.split("_")

			switch (type) {
				case "authors":
					element = {
						id: type,
						type: ELEMENT_TYPE.AUTHORS,
					}
					break
				case "list":
					element = {
						id: type,
						type: ELEMENT_TYPE.AUTHOR_DETAIL,
					}
					break
				case "doc":
					element = {
						id: id,
						type: ELEMENT_TYPE.DOC,
					}
					break
				default:
					return
			}

			return element
		},

		close: async (state, id, store) => {
			const docs = state.all.filter(doc => doc.id != id)
			store.setAll(docs)
		}

	},
	mutators: {
		setAll: (state, all) => ({ all }),
		setFocus: (state, focus) => ({ focus }),
	},
}

export default store

