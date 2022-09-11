import { createStore } from "@priolo/jon"

const store = createStore({

	state: {
		position: {},
		idOpen: null,
		path: null,
	},

	getters: {
	},

	actions: {

		/** Apre la DIALOG setandone la posizione */
		open: ({ id, leaf, position }, store) => {
			const [node, path] = leaf
			store.setPosition(position)
			store.setIdOpen(id)
			store.setPath(path)

			//storeTypeDialog.setTabIndex(1)
		},

		/** Chiude la DIALOG  */
		close: (_, store) => {
			//const { setTabIndex } = getStoreTypeDialog()
			store.setIdOpen(null)
			//setTabIndex(0)
		},

	},
	mutators: {
		setIdOpen: idOpen => ({ idOpen }),
		setPosition: position => ({ position }),
		setPath: path => ({ path }),
	},
})

export default store
