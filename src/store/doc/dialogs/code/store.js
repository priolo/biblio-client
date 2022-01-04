/* eslint eqeqeq: "off" */

import { getStore } from "@priolo/jon"
import { Transforms } from "slate"
import { ELEMENT_TYPE } from "store/url"

const store = {
	state: {

		// dialog editor code 
		isEditorCodeOpen: false,
		// code in edit
		codeInEdit: null,
		docId: null,
		entryInEdit: null,


		
	},
	getters: {
		
	},
	actions: {
		
		// /** Apre la DIALOG setandone la posizione */
		// open: (state, { position }, store) => {
		// 	store.setPosition(position)
		// 	store.setIsOpen(true)
		// },

		// /** Chiude la DIALOG  */
		// close: (state, _, store) => {
		// 	store.setIsOpen(false)
		// },

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
		setIsEditorCodeOpen: (state, isEditorCodeOpen) => ({ isEditorCodeOpen }),
		setCodeInEdit: (state, codeInEdit) => ({ codeInEdit }),
		setDocId: (state, docId) => ({ docId }),
		setEntryInEdit: (state, entryInEdit) => ({ entryInEdit }),

	},
}

export default store
