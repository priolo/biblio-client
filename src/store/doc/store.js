/* eslint eqeqeq: "off" */
import { BLOCK_TYPE } from "."
import docs from "./docs.mock"
import { withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { createEditor, Editor, Transforms } from 'slate'
import { array, time } from "@priolo/jon-utils"
import { withImages } from "./withImages"
import { composeIdentity, ELEMENT_TYPE } from "store/url"

const store = {
	state: {
		// id
		type: ELEMENT_TYPE.DOC,
		author: "Priolo22",
		title: "Questo testo è statico",
		subtitle: "Mbeh se è per questo anche questo lo è!",
		date: "14/08/1975",
		value: [],
		editor: null,
	},
	init: (store) => {
		// creo l'editor
		const editor = withImages(withHistory(withReact(createEditor())))
		store.setEditor(editor)
		store.load()
	},
	getters: {
		/** Restituisce tutti i ELEMENT_TYPE attualmente selezionati */
		getSelectedTypes: (state, _, store) => {
			const entries = Editor.nodes(state.editor, { match: n => n.type != null })
			const entriesArr = [...entries]
			const groupsEntries = array.groupBy(entriesArr, (e1, e2) => e1[0].type == e2[0].type)
			const types = groupsEntries.map(groupEntries => groupEntries[0][0].type)
			return types
		},
		isBold: (state, _, store) => {
			const [match] = Editor.nodes(state.editor, {
				match: n => n.bold === true,
				universal: true,
			})
			return !!match
		},
		// getFormat: (state, _, store) => {
		// 	const [match] = Editor.nodes(state.editor, {
		// 		match: n => Text.isText(n),
		// 		universal: true,
		// 	})
		// 	return !!match
		// },
		/** indica che (true) il documento non è stato ancora salvato sul server  */
		isNew: (state, _, store) => true,
		/** Restituisce l'IDENTITY dell'ELEMENT che contiene questo DOC*/
		getIdentity: (state, _, store) => composeIdentity(state.type, state.id),
	},
	actions: {

		fetch: (state, _, store) => {
			// const doc = docs.find(doc => doc.id == state.id)
			// const newState = { ...state, ...doc }
			// store._update(newState)
		},
		/**
		 * Cambia il type del testo selezionato
		 */
		changeType: (state, type, store) => {
			Transforms.setNodes(
				state.editor,
				{ type: type },
				{ match: n => Editor.isBlock(state.editor, n) }
			)
		},
		/** cambia il formato del testo selezionato */
		changeFormat: (state, format, store) => {
			Transforms.setNodes(
				state.editor,
				{ bold: bold ? null : true },
				{ match: n => Text.isText(n), split: true }
			)
		},
		// da verificare
		setFocus: (state, _, store) => editor.focus(),
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


			if ( !value ) {
				value = [
					{
						type: BLOCK_TYPE.CHAPTER,
						children: [{ text: 'Questo è un dcumento' }],
					},
					{
						type: BLOCK_TYPE.PARAGRAPH,
						children: [{ text: 'Primo paragrafo' }],
					},
					{
						type: BLOCK_TYPE.TEXT,
						children: [{ text: 'descrizione del primo paragrafo' }],
					},
					{
						type: BLOCK_TYPE.PARAGRAPH,
						children: [{ text: 'secondo paragrafo' }],
					},
					{
						type: BLOCK_TYPE.TEXT,
						children: [{ text: 'descrizione del secondo paragrafo' }],
					},
				]
			}	

			// il doc è gia' presente sul server allora lo carico
			store.setValue(value)
		}

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

export default store