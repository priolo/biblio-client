/* eslint eqeqeq: "off" */

import { getStore } from "@priolo/jon"
import { Transforms } from "slate"
import { BLOCK_TYPE } from "store/doc"
import { ELEMENT_TYPE } from "store/url"

const store = {
	state: {

		// dialog edit BLOCK_TYPE
		//isOpen: false,
		//idOpen: null, 

		/** lista di elementi da visualizzare nella dialog  
		 * `{ id:string, label:string, desc: string }`
		 */
		items: [
			{ id: BLOCK_TYPE.CHAPTER, label: "Chapter", desc: "Inserisce un capitolo" },
			{ id: BLOCK_TYPE.PARAGRAPH, label: "Paragraph", desc: "Inserisce un paragrafo" },
			{ id: BLOCK_TYPE.TEXT, label: "Text", desc: "Il normale blocco di testo" },
			{ id: BLOCK_TYPE.CODE, label: "Code", desc: "Codice" },
			{ id: BLOCK_TYPE.IMAGE, label: "Image", desc: "Image" },
		],
		itemsIdSelect: [],

		tabIndex: 0,
	},
	getters: {
		isSelected: (state, id, store) => {
			return state.itemsIdSelect.some(item => item == id)
		},
	},
	actions: {
		
		// /** Apre la DIALOG setandone la posizione */
		// open: (state, identity, store) => {
		// 	store.setIdOpen(identity)
		// },

		// /** Chiude la DIALOG  */
		// close: (state, _, store) => {
		// 	store.setIdOpen(null)
		// },

	},
	mutators: {
		//setIsOpen: (state, isOpen) => ({ isOpen }),
		//setPosition: (state, position) => ({ position }),
		//setIdOpen: (state, idOpen) => ({ idOpen }),

		setItems: (state, items) => ({ items }),
		setItemsIdSelect: (state, itemsIdSelect) => ({ itemsIdSelect }),

		setTabIndex: (state, tabIndex) => ({ tabIndex }),

	},
}

export default store
