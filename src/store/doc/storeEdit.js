/* eslint eqeqeq: "off" */
import { BLOCK_TYPE } from "."
import { Editor, Path, Transforms, Element, Node, Range, Text } from 'slate'
import { array } from "@priolo/jon-utils"
import { ReactEditor } from "slate-react"

const store = {

	state: {
	},

	getters: {

		/** 
		 * Restituisce tutti i ELEMENT_TYPE attualmente selezionati 
		 * @returns Array<ELEMENT_TYPE>
		 **/
		getSelectedTypes: (state, _, store) => {
			// ricavo le ENTRY selezionate
			const entries = Editor.nodes(state.editor, { match: n => n.type != null })
			const entriesArr = [...entries]
			// raggruppo le ENTRY per "type" e le restituisco
			return array
				.groupBy(entriesArr, (e1, e2) => e1[0].type == e2[0].type)
				.map(groupEntries => groupEntries[0][0].type)
		},

		/**
		 * Restituisce il primo ENTRY attualmente selezionato
		 * @returns NodeEntry
		 */
		getFirstSelectEntry: (state, _, store) => {
			const entry = Editor.node(state.editor,
				state.editor.selection,
				{ depth: 1 }
			)
			return entry
		},

		/**
		 * restituisce il LEAF selezionato in questo momento
		 * @returns EntryNode
		 */
		 entryTextSelect: (state, _, store) => {
			const [entry] = Editor.nodes(state.editor, {
				match: n => Text.isText(n),
				mode: "lowest",
			})
			return entry ?? [{}]
		},

		/**
		 * cerco la ENTRY di questo componente nello STORE-DOC
		 **/
		getEntryByElement: (state, element, store) => {
			const [match] = Editor.nodes(state.editor, {
				match: n => n === element,
				at: [],
				voids: true,
			})
			return match
		},


	},
	actions: {

		/**
		 * Aggiorna il testo selezionato con le proprietà passate come parametro
		 * usato nella "dialog vertical" per esempio per impostare il BOLD
		 */
		changeSelectText: (state, nodePartial, store) => {
			Transforms.setNodes(
				state.editor,
				nodePartial,
				{ match: n => Text.isText(n), split: true }
			)
		},

		/**
		 * Elimino i BLOCKs selezionati, li unisco in un unico TYPE e li reinserisco
		 */
		changeSelectTypeAndMerge: (state, type, store) => {
			const { editor } = state
			const selectA = editor.selection.anchor.path[0]
			const selectB = editor.selection.focus.path[0]

			// se è solo un BLOCK allora lo aggiorna solamente
			if (selectA == selectB) {
				const elementUpdate = { type }
				Transforms.setNodes(
					editor,
					elementUpdate,
					{ match: n => Editor.isBlock(editor, n) }
				)
				console.log("single")
				return
			}



			const span = [[Math.min(selectA, selectB)], [Math.max(selectA, selectB)]]
			// prendo tutti i TEXT presenti nello SPAN
			const textsGen = Node.texts(editor, {
				from: span[0], to: span[1],
			})
			// se true prende del NODE solo la proprietà "text" altrimenti tutto
			const onlyText = type == BLOCK_TYPE.CODE //|| type == BLOCK_TYPE.IMAGE
			// mergio tutti i TEXT
			const texts = [...textsGen].map((textEntry, index, array) => {
				const textNode = textEntry[0]
				const endline = index < array.length - 1 ? "\n" : ""
				const text = `${textNode.text}${endline}`
				return { ...(onlyText ? {} : textNode), text }
			})
			// creo il nuovo node
			const node = { type, children: texts }
			// rimuovo i vecchi NODE
			Transforms.removeNodes(editor, { at: span })
			// inserisco al loro posto il nuovo NODE
			Transforms.insertNodes(editor, node, {
				at: span[0], select: true, hanging: true, voids: true, mode: "highest",
			})
		},

		// changeType: ( state, type, store ) => {
		// 	const { editor } = state
		// 	// prelevo il primo NODE (se c'e') dei SELECTIOM che sia di tipo "code"
		// 	const [match] = Editor.nodes(editor, {
		// 		match: n => n.type === 'code',
		// 	})
		// 	// (toggle) se c'e' setto la selezione al type=default invece se NON è type="code" lo setto a "code"
		// 	// modifica tutti i NODE (che match) SELECTED facendo una specie di "merge" con "elementUpdate"
		// 	const elementUpdate = { type: match ? null : 'code' }
		// 	Transforms.setNodes(
		// 		editor,
		// 		elementUpdate,
		// 		{ match: n => Editor.isBlock(editor, n) }
		// 	)
		// },

		// /** cambia il formato del testo selezionato */
		// changeFormat: (state, format, store) => {
		// 	Transforms.setNodes(
		// 		state.editor,
		// 		{ bold: bold ? null : true },
		// 		{ match: n => Text.isText(n), split: true }
		// 	)
		// },

		// da verificare
		setFocus: (state, _, store) => {
			//console.log("set focus")
			//Transforms.select(state.editor, [0])
		},


		/**
		 * Inserisco un NODE nel PATH indicato e lo seleziono
		 */
		addNode: (state, { path, node, options }, store) => {
			// prendo il prossimo PATH [number]
			const pathNext = Path.next(path)
			// inserisco un NODE nel prossimo PATH
			Transforms.insertNodes(state.editor, node, { at: pathNext })
			// lo seleziono
			if (options?.select) Transforms.select(state.editor, pathNext)
		},

		modifyNode: (state, { element, props }, store) => {
			const { editor } = state
			// ATTENZIONE funziona solo per 
			const path = ReactEditor.findPath(editor, element)
			Transforms.setNodes(
				editor,
				props,
				{
					at: path,
					mode: 'highest',
					voids: true,
				}
			)
		},




	},
	mutators: {
	},
}

export default store