import { useStore } from '@priolo/jon'
import { Editor, Transforms, Text, Path } from 'slate'
import { Editable } from 'slate-react'
import {getElementStore} from '/src/store/doc'
import { BLOCK_TYPE } from '/src/store/doc/utils'
import BiblioElement from './elements/BiblioElement'
import BiblioLeaf from './leafs/BiblioLeaf'

/**
 * 
 * @param {{editor:Editor}} param0 
 * @returns 
 */
export default function BiblioEditable({
	element,
	onFocus,
	onBlur,
}) {

	// HOOKs
	const store = getElementStore(element.identity)
	const doc = useStore(store)
	const {changeSelectText, getEntryTextSelect, getFirstSelectEntry, addNode } = store

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
				const [leaf] = getEntryTextSelect()
				changeSelectText({ bold: !leaf.bold })
				break
			}
		}
	}

	// RENDER
	return (
		<Editable
			renderElement={props => <BiblioElement {...props} doc={element}/>}
			renderLeaf={props => <BiblioLeaf {...props} doc={element} />}
			onFocus={onFocus}
			onBlur={onBlur}
			onKeyDown={handleKeyDown}
		/>
	)
}
