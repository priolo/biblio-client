/* eslint eqeqeq: "off" */

import { getStore } from "@priolo/jon"
import { Transforms } from "slate"
import { BLOCK_TYPE } from "store/doc"
import { ELEMENT_TYPE } from "store/url"

const store = {
	state: {

		// dialog editor code 
		isEditorCodeOpen: false,
		// code in edit
		codeInEdit: null,
		docId: null,
		entryInEdit: null,


		// dialog edit BLOCK_TYPE
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
			{ id: BLOCK_TYPE.IMAGE, label: "Image", desc: "Image" },
		],
		itemsIdSelect: [],
	},
	getters: {
		isSelected: (state, id, store) => {
			return state.itemsIdSelect.some(item => item == id)
		},
	},
	actions: {
		
		/** Apre la DIALOG setandone la posizione */
		open: (state, { position }, store) => {
			store.setPosition(position)
			store.setIsOpen(true)
		},

		/** Chiude la DIALOG  */
		close: (state, _, store) => {
			store.setIsOpen(false)
		},

		/** Applica le modifiche della DIALOG sull'ELEMENT del DOC di partenza */
		updateCode: (state, _, store) => {
			const docStore = getStore(state.docId)
			if (!docStore || docStore.state.type != ELEMENT_TYPE.DOC) return null
			const { state: doc } = docStore
		
			Transforms.insertText(doc.editor, state.codeInEdit, {
				at: state.entryInEdit[1],
				voids: true
			})
		},

		resetFocus: (state, _, store) => {
			const docStore = getStore(state.docId)
			if (!docStore || docStore.state.type != ELEMENT_TYPE.DOC) return null
			const { setFocus } = docStore
			setFocus()
		},
	},
	mutators: {
		setIsOpen: (state, isOpen) => ({ isOpen }),
		setPosition: (state, position) => ({ position }),

		setItems: (state, items) => ({ items }),
		setItemsIdSelect: (state, itemsIdSelect) => ({ itemsIdSelect }),

		setIsEditorCodeOpen: (state, isEditorCodeOpen) => ({ isEditorCodeOpen }),
		setCodeInEdit: (state, codeInEdit) => ({ codeInEdit }),
		setDocId: (state, docId) => ({ docId }),
		setEntryInEdit: (state, entryInEdit) => ({ entryInEdit }),

	},
}

export default store
