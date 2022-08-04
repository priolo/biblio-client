/* eslint eqeqeq: "off" */

import { createStore } from "@priolo/jon"
import { Transforms } from "slate"
import {getElementStore} from "store/doc"
import { ELEMENT_TYPE } from "store/url/utils"

const store = createStore({
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
		updateCode: (_, {state}) => {
			const docStore = getElementStore(state.docId)
			if (!docStore || docStore.state.type != ELEMENT_TYPE.DOC) return null
			const { state: doc } = docStore
		
			Transforms.insertText(doc.editor, state.codeInEdit, {
				at: state.entryInEdit[1],
				voids: true
			})
		},

		resetFocus: ( _, {state}) => {
			const docStore = getElementStore(state.docId)
			if (!docStore || docStore.state.type != ELEMENT_TYPE.DOC) return null
			const { setFocus } = docStore
			setFocus()
		},
	},
	mutators: {
		setIsEditorCodeOpen: isEditorCodeOpen => ({ isEditorCodeOpen }),
		setCodeInEdit: codeInEdit => ({ codeInEdit }),
		setDocId: docId => ({ docId }),
		setEntryInEdit: entryInEdit => ({ entryInEdit }),

	},
})

export default store
