/* eslint eqeqeq: "off" */
import { BLOCK_TYPE } from "."
import { ReactEditor, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { createEditor, Editor, Range } from 'slate'
import { time } from "@priolo/jon-utils"
import { mixStores } from "@priolo/jon"
import { withImages } from "./withImages"
import { composeIdentity, ELEMENT_TYPE, getUrlHash } from "store/url"
import storeEdit from "./storeEdit"
import { withCode } from "./withCode"
import { docImg } from "./docs.mock"
import { getStoreTypeDialog } from "./dialogs/type"
import { getStoreLinkPopUp } from "./dialogs/link"
import utils from "@priolo/jon-utils"


function withLink(editor) {
	const { insertData } = editor

	editor.insertData = (data) => {
		const fnOrigin = insertData(data)
		if (!fnOrigin) return null

		const text = data.getData('text/plain')
		if (utils.isUrl(text)) {
			Editor.insertNode(editor, {
				type: BLOCK_TYPE.TEXT, 
				children: [{ 
					link: true,
					text: text, 
					url: text,
				}]
			})
			return null
		}
		return fnOrigin
	}
	return editor
}

const store = {

	state: {
		// id = identificativo del documento
		type: ELEMENT_TYPE.DOC,
		author: "Priolo22",
		title: "Questo testo è statico",
		subtitle: "Mbeh se è per questo anche questo lo è!",
		date: "14/08/1975",
		value: [
			{ "type": BLOCK_TYPE.TEXT, "children": [{ text: "" }] },
		],
		editor: null,
	},

	init: (store) => {
		// creo l'editor
		const { getSelectedTypes } = store
		const editor = withLink(withImages(withCode(withHistory(withReact(createEditor())))))
		const { onChange, insertData } = editor
		editor.onChange = () => {
			const { setItemsIdSelect } = getStoreTypeDialog()
			//const { open } = getStoreLinkPopUp()

			//onChange()
			store.setValue(editor.children)

			const types = getSelectedTypes()
			setItemsIdSelect(types)

			// const leaf = Editor.leaf(editor, Range.start(editor.selection))
			// if (leaf && leaf[0].link) {
			// 	const domNode = ReactEditor.toDOMNode(editor, leaf[0])
			// 	const left = domNode.offsetLeft// + mboh.offsetWidth
			// 	const top = domNode.offsetTop + domNode.offsetHeight
			// 	open({
			// 		id: store.getIdentity(),
			// 		position: { left, top },
			// 		leaf,
			// 	})
			// }
		}
		editor.insertData = async (data) => {
			const fnOrigin = await insertData(data)
			if ( !fnOrigin ) return null
			await fnOrigin(data)
		}


		store.setEditor(editor)
		store.load()
	},

	getters: {

		/** indica che (true) il documento non è stato ancora salvato sul server  */
		isNew: (state, _, store) => true,

		/** Restituisce l'IDENTITY dell'ELEMENT che contiene questo DOC*/
		getIdentity: (state, _, store) => composeIdentity(state.type, state.id),

		/** [bool] se questo DOCUMENT è attualmente selezionato */
		isSelect: (state, _, store) => {
			// prelevo il DOC selezionato dall'URL
			const docIdSelect = getUrlHash()
			return docIdSelect == store.getIdentity()
		}
	},

	actions: {

		fetch: (state, _, store) => {
			// const doc = docs.find(doc => doc.id == state.id)
			// const newState = { ...state, ...doc }
			// store._update(newState)
		},

		/** memorizza lo stato di questo documento */
		save: (state, _, store) => {

			// se il doc non è stato ancora creato sul server allora lo memorizzo in locale
			if (store.isNew()) {
				const storage = window.localStorage
				const value = JSON.stringify(state.value)
				storage.setItem(store.getIdentity(), value)
				return
			}

			// va salvato sul server
			// ...
		},

		load: (state, _, store) => {
			let value

			// se è nuovo cerco il documento nel localStorage
			if (store.isNew()) {
				const storage = window.localStorage
				value = storage.getItem(store.getIdentity())
				if (value) value = JSON.parse(value)
			}

			if (!value) {
				value = docImg
			}

			// il doc è gia' presente sul server allora lo carico
			// TODO: caricare il doc dal server

			store.setValue(value)
		},

		onClose: (state, _, store) => {
			console.log("on close")
		},
	},
	mutators: {
		setValue: (state, value, store) => {
			const identity = store.getIdentity()
			time.debounce(identity, () => store.save(), 2000)
			return { value }
		},
		setEditor: (state, editor) => ({ editor }),
	},
}

export default mixStores(store, storeEdit)