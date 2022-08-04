/* eslint eqeqeq: "off" */
//import { BLOCK_TYPE, fetchDocument } from "."
import { withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { createEditor, Editor, Transforms } from 'slate'

import { time } from "@priolo/jon-utils"
import { createStore, mixStores } from "@priolo/jon"

import { withImages } from "./withImages"
import { withCode } from "./withCode"

import { composeIdentity, ELEMENT_TYPE, getUrlHash } from "store/url/utils"

import setupEdit from "./storeEdit"
import storeTypeDialog from "./dialogs/type"

import { withLink } from "./withLink"
import { docImg } from "./docs.mock"


const setupDoc = {

	state: {
		type: ELEMENT_TYPE.DOC,
		author: "Priolo22",
		title: "Questo testo è statico",
		subtitle: "Mbeh se è per questo anche questo lo è!",
		date: "14/08/1975",
		editor: null,
	},

	getters: {
		getIdentity: (_, {state}) => composeIdentity(state.type, state.id),
		isSelect: (_, store) => {
			// prelevo il DOC selezionato dall'URL
			const docIdSelect = getUrlHash()
			return docIdSelect == store.getIdentity()
		}
	},

	actions: {
		fetch: (_, {state, ...store}) => {
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
		save: (_, {state, ...store}) => {

			// lo memorizzo temporaneamente in locale
			const storage = window.localStorage
			const value = JSON.stringify(state.value)
			storage.setItem(store.getIdentity(), value)

			// va salvato sul server
			// ...
		},
		onClose: () => {
			console.log("on close")
		},
	},
	mutators: {
		setEditor: editor => ({ editor }),
	},
}

const setup = mixStores(setupDoc, setupEdit)

function init(store) {
	// creo l'editor SLATE
	const identity = store.getIdentity()
	const editor = withLink(withImages(withCode(withHistory(withReact(createEditor())))))
	const { insertData } = editor

	editor.onChange = () => {
		const { setItemsIdSelect } = storeTypeDialog
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
}


const ElementStores = new Map()

function createDocStore ( id ) {
	const newSetup = { ...setup }
	newSetup.state = { ...newSetup.state, id }
	const store = createStore(newSetup)
	init(store)
	addElementStore ( id, store )
}

function addElementStore ( id, store ) {
	ElementStores.set ( id, store )
}

function getElementStore( id ) {
	return ElementStores.get(id)
}

function delElementStore(id) {
	ElementStores.delete(id)
}

export {
	createDocStore,
	addElementStore,
	getElementStore,
	delElementStore,
}
