import { Editor, Transforms, Text } from 'slate'
import { Editable } from 'slate-react'
import BiblioElement from './elements/BiblioElement'
import BiblioLeaf from './leafs/BiblioLeaf'


export default function BiblioEditable({
	editor,
	onFocus,
	onBlur,
}) {

	// HOOKs

	// HANDLE

	// RENDER
	return (
		<Editable
			renderElement={BiblioElement}
			renderLeaf={BiblioLeaf}

			onFocus={onFocus}
			onBlur={onBlur}
			onKeyDown={event => {

				if (!event.ctrlKey) {
					return
				}

				switch (event.key) {

					case '1': {
						event.preventDefault()
						const [match] = Editor.nodes(editor, {
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

					// case 'c': {
					// 	event.preventDefault()
					// 	Transforms.setNodes(
					// 		editor,
					// 		{ code: true },
					// 		{ match: n => Text.isText(n), split: true }
					// 	)
					// 	break
					// }

				}
			}}
		/>

	)
}
