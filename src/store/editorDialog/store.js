/* eslint eqeqeq: "off" */

import { BLOCK_TYPE } from "store/doc"

const store = {
	state: {
		isOpen: false,
		position: {},
		/** lista di elementi da visualizzare nella dialog  
		 * `{ id:string, label:string, desc: string }`
		 */
		items: [
			{ id: BLOCK_TYPE.CHAPTER, label: "Chapter", desc: "Inserisce un capitolo" },
			{ id: BLOCK_TYPE.PARAGRAPH, label: "Paragraph", desc: "Inserisce un paragrafo" },
			{ id: BLOCK_TYPE.TEXT, label: "Text", desc: "Il normale blocco di testo" },
			{ id: BLOCK_TYPE.CODE, label: "Code", desc: "Codice" },
		],
		itemsIdSelect: [],
	},
	getters: {
		isSelected: (state, id, store) => {
			return state.itemsIdSelect.some(item => item == id)
		},
	},
	actions: {
		open: (state, { content, position }, store) => {
			store.setPosition(position)
			store.setIsOpen(true)
		},
		close: (state, _, store) => {
			store.setIsOpen(false)
		},
	},
	mutators: {
		setIsOpen: (state, isOpen) => ({ isOpen }),
		setPosition: (state, position) => ({ position }),

		setItems: (state, items) => ({ items }),
		setItemsIdSelect: (state, itemsIdSelect) => ({ itemsIdSelect }),
	},
}

export default store
