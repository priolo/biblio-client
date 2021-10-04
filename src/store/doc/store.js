/* eslint eqeqeq: "off" */
import { ELEMENTS_TYPE } from "."
import docs from "./docs.mock"
import { Slate, withReact } from 'slate-react'
import { createEditor, Editor } from 'slate'

const store = {
	state: {
		author: "Priolo22",
		title: "Questo testo è statico",
		subtitle: "Mbeh se è per questo anche questo lo è!",
		date: "14/08/1975",
		value: [
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
		],
		editor: null,
	},
	init: (store) => {
		store.setEditor( withReact(createEditor()) )
	},
	getters: {
	},
	actions: {
		fetch: (state, _, store) => {
			// const doc = docs.find(doc => doc.id == state.id)
			// const newState = { ...state, ...doc }
			// store._update(newState)
		}
	},
	mutators: {
		setValue: (state, value) => ({value}),
		setEditor: (state, editor) => ({editor}),
	},
}

export default store