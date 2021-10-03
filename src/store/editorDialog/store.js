/* eslint eqeqeq: "off" */

import { ELEMENTS_TYPE } from "store/doc"

const store = {
	state: {
		isOpen: false,
		position: {},
		/** lista di elementi da visualizzare nella dialog  
		 * `{ id:string, label:string, desc: string }`
		 */
		items: [
			{ id: ELEMENTS_TYPE.CHAPTER, label: "Chapter", desc: "Inserisce un capitolo" },
			{ id: ELEMENTS_TYPE.PARAGRAPH, label: "Paragraph", desc: "Inserisce un paragrafo" },
			{ id: ELEMENTS_TYPE.TEXT, label: "Testo", desc: "Il normale blocco di testo" },
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
