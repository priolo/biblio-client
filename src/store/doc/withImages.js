import { Transforms } from "slate"
import { BLOCK_TYPE } from "."

/**
 * Extend "withReact" di Slate
 * per gestire il drag delle immagini
 * @param {*} editor 
 * @returns 
 */
export const withImages = editor => {
	const { insertData, isVoid } = editor

	// editor.isVoid = element => {
	// 	return element.type === BLOCK_TYPE.IMAGE ? true : isVoid(element)
	// }

	editor.insertData = data => {
		const text = data.getData('text/plain')
		const { files } = data

		if (files && files.length > 0) {
			for (const file of files) {
				const reader = new FileReader()
				const [mime] = file.type.split('/')

				if (mime === 'image') {
					reader.addEventListener('load', () => {
						const url = reader.result
						insertImage(editor, url)
					})

					reader.readAsDataURL(file)
				}
			}
		} else if (isImageUrl(text)) {
			insertImage(editor, text)
		} else {
			insertData(data)
		}
	}

	return editor
}

const insertImage = (editor, url) => {
	const text = { text: '' }
	const image = { type: BLOCK_TYPE.IMAGE, url, children: [text] }
	Transforms.insertNodes(editor, image)
}

const isImageUrl = url => {
	if (!url) return false
	if (!isUrl(url)) return false
	const ext = new URL(url).pathname.split('.').pop()
	return imageExtensions.includes(ext)
}