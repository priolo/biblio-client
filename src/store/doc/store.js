/* eslint eqeqeq: "off" */
import { ELEMENTS_TYPE } from "."
import docs from "./docs.mock"
import { withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { createEditor, Editor } from 'slate'
import { array } from "@priolo/jon-utils"
import { withImages } from "./withImages"

const store = {
	state: {
		author: "Priolo22",
		title: "Questo testo è statico",
		subtitle: "Mbeh se è per questo anche questo lo è!",
		date: "14/08/1975",
		value: [],
		editor: null,
	},
	init: (store) => {
		store.setEditor( withImages(withHistory(withReact(createEditor()))) )
		store.setValue([
			{
				type: ELEMENTS_TYPE.CHAPTER,
				children: [{ text: 'Questo è un dcumento' }],
			},
			{
				type: ELEMENTS_TYPE.PARAGRAPH,
				children: [{ text: 'Primo paragrafo' }],
			},
			{
				type: ELEMENTS_TYPE.TEXT,
				children: [{ text: 'descrizione del primo paragrafo' }],
			},
			{
				type: ELEMENTS_TYPE.PARAGRAPH,
				children: [{ text: 'secondo paragrafo' }],
			},
			{
				type: ELEMENTS_TYPE.TEXT,
				children: [{ text: 'descrizione del secondo paragrafo' }],
			},
		])
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
	},
	actions: {
		fetch: (state, _, store) => {
			// const doc = docs.find(doc => doc.id == state.id)
			// const newState = { ...state, ...doc }
			// store._update(newState)
		},
		// da verificare
		setFocus: (state, _, store) => editor.focus(),
	},
	mutators: {
		setValue: (state, value) => ({value}),
		setEditor: (state, editor) => ({editor}),
	},
}

export default store