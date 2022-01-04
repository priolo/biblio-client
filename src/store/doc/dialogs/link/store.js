/* eslint eqeqeq: "off" */

import { getStore } from "@priolo/jon"
import { getStoreTypeDialog } from "../type"


const store = {

	state: {
		position: {},
		idOpen: null,
		path: null,
	},

	getters: {
	},

	actions: {

		/** Apre la DIALOG setandone la posizione */
		open: (state, { id, leaf, position }, store) => {
			//const { setTabIndex } = getStoreTypeDialog()
			const [node, path] = leaf
			store.setPosition(position)
			store.setIdOpen(id)
			store.setPath(path)
			//setTabIndex(1)
		},

		/** Chiude la DIALOG  */
		close: (state, _, store) => {
			//const { setTabIndex } = getStoreTypeDialog()
			store.setIdOpen(null)
			//setTabIndex(0)
		},

	},
	mutators: {
		setIdOpen: (state, idOpen) => ({ idOpen }),
		setPosition: (state, position) => ({ position }),
		setPath: (state, path) => ({ path }),

	},
}

export default store
