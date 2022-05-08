/* eslint eqeqeq: "off" */
import { BLOCK_TYPE, fetchDocument } from "."
import { withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { createEditor, Editor, Transforms } from 'slate'
import { time } from "@priolo/jon-utils"
import { mixStores } from "@priolo/jon"
import { withImages } from "./withImages"
import { composeIdentity, ELEMENT_TYPE, getUrlHash } from "store/url"
import storeEdit from "./storeEdit"
import { withCode } from "./withCode"

import { getStoreTypeDialog } from "./dialogs/type"
import { withLink } from "./withLink"
import { docImg } from "./docs.mock"


const store = {

	state: {
		type: ELEMENT_TYPE.DOC,
		author: "Priolo22",
		title: "Questo testo è statico",
		subtitle: "Mbeh se è per questo anche questo lo è!",
		date: "14/08/1975",
		editor: null,
	},

	init: async (store) => {
		// creo l'editor SLATE
		const identity = store.getIdentity()
		const editor = withLink(withImages(withCode(withHistory(withReact(createEditor())))))

		const { insertData } = editor

		editor.onChange = () => {
			const { setItemsIdSelect } = getStoreTypeDialog()
			time.debounce(identity, () => store.save(), 2000)
			const types = store.getSelectedTypes()
			setItemsIdSelect(types)
		}

		editor.insertData = async (data) => {
			const fnOrigin = await insertData(data)
			if (!fnOrigin) return null
			await fnOrigin(data)
		}

		store.setEditor(editor)
	},

	getters: {
		getIdentity: (state, _, store) => composeIdentity(state.type, state.id),
		isSelect: (state, _, store) => {
			// prelevo il DOC selezionato dall'URL
			const docIdSelect = getUrlHash()
			return docIdSelect == store.getIdentity()
		}
	},

	actions: {
		fetch: (state, _, store) => {
			const identity = store.getIdentity()

			const storage = window.localStorage
			let value = storage.getItem(identity)
			if (value) {
				try {
					value = JSON.parse(value)
				} catch ( _ ) {
					value = null
				}
			}
			if (!value) {
				value = docImg
			}
			Transforms.insertNodes(state.editor, value)
		},
		save: (state, _, store) => {

			// lo memorizzo temporaneamente in locale
			const storage = window.localStorage
			const value = JSON.stringify(state.value)
			storage.setItem(store.getIdentity(), value)

			// va salvato sul server
			// ...
		},
		onClose: (state, _, store) => {
			console.log("on close")
		},
	},
	mutators: {
		setEditor: (state, editor) => ({ editor }),
	},
}

export default mixStores(store, storeEdit)