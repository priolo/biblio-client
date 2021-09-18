import { useMemo, useState, useCallback, useEffect } from 'react'

// Import the Slate components and React plugin.
import { Editor, Transforms, Text } from 'slate'
import { Editable, useFocused } from 'slate-react'
import BiblioEditor from "./BiblioEditor"
import BiblioElement from './elements/BiblioElement'


export default function BiblioEditable({
	editor
}) {

	// HOOKs
	
	// HANDLE

	// RENDER

	// Define a leaf rendering function that is memoized with `useCallback`.
	const renderLeaf = useCallback(props => {
		return <Leaf {...props} />
	}, [])

	return (
		<Editable
			renderElement={BiblioElement}
			// Pass in the `renderLeaf` function.
			renderLeaf={renderLeaf}
			onKeyDown={event => {
				if (!event.ctrlKey) {
					return
				}

				switch (event.key) {
					case '1': {
						event.preventDefault()
						const [match] = BiblioEditor.nodes(editor, {
							match: n => n.type === 'code',
						})
						Transforms.setNodes(
							editor,
							{ type: match ? null : 'code' },
							{ match: n => Editor.isBlock(editor, n) }
						)
						break
					}

					case 'b': {
						event.preventDefault()
						Transforms.setNodes(
							editor,
							{ bold: true },
							{ match: n => Text.isText(n), split: true }
						)
						break
					}
				}
			}}
		/>

	)
}


const Leaf = props => {
	return (
		<span
			{...props.attributes}
			style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
		>
			{props.children}
		</span>
	)
}