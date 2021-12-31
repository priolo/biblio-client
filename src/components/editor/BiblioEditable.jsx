import { Editor, Transforms, Text, Path } from 'slate'
import { Editable } from 'slate-react'
import { BLOCK_TYPE } from 'store/doc'
import BiblioElement from './elements/BiblioElement'
import BiblioLeaf from './leafs/BiblioLeaf'

/**
 * 
 * @param {{editor:Editor}} param0 
 * @returns 
 */
export default function BiblioEditable({
	store,
	onFocus,
	onBlur,
}) {

	// HOOKs
	const { state: doc, changeSelectText, findInSelectText, getFirstSelectEntry, addNode } = store

	// HANDLE
	const handleKeyDown = event => {

		// premo il bottone ENTER
		if (event.key == "Enter") {
			// prelevo l'ENTRY in corrente selezione, aggiungo un TEXT dopo e lo seleziono
			const [node, path] = getFirstSelectEntry()
			if (node.type == BLOCK_TYPE.CODE || node.type == BLOCK_TYPE.IMAGE) {
				event.preventDefault()
				addNode({
					path,
					node: { type: "text", children: [{ text: "" }] }, 
					options: { select: true }
				})
				return
			}
		}

		// se non sto premento contemporaneamente CTRL annulla
		if (!event.ctrlKey) return

		// altrimenti...
		switch (event.key) {

			case 'b': {
				event.preventDefault()
				changeSelectText({ bold: !findInSelectText(n => n.bold) })
				break
			}
		}
	}

	// RENDER
	return (
		<Editable
			renderElement={BiblioElement}
			renderLeaf={BiblioLeaf}
			onFocus={onFocus}
			onBlur={onBlur}
			onKeyDown={handleKeyDown}
		/>
	)
}
