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

	editor.insertData = async (data) => {
		const text = data.getData('text/plain')
		const { files } = data

		if (files && files.length > 0) {
			for (const file of files) {
				const urlData = await urlDataFromFile(file)
				insertImage(editor, urlData)
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

export async function urlDataFromFile( file ) {
	const [mime] = file.type.split('/')
	if (mime != 'image') return null
	return new Promise ( (res, rej) => {
		const reader = new FileReader()
		reader.addEventListener('load', (e) => {
			res(e.target.result)
		})
		reader.readAsDataURL(file)
	})
}

export async function urlDataResize( urlData ) {
	//const url = reader.result
	return new Promise ( (res,rej) => {
		var image = new Image();
		image.onload = function (imageEvent) {
			// Resize the image
			var canvas = document.createElement('canvas'),
				max_size = 20,// TODO : pull max size from a site config
				width = image.width,
				height = image.height;
			if (width > height) {
				if (width > max_size) {
					height *= max_size / width;
					width = max_size;
				}
			} else {
				if (height > max_size) {
					width *= max_size / height;
					height = max_size;
				}
			}
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext('2d')
			ctx.drawImage(image, 0, 0, width, height);
			// ctx.mozImageSmoothingEnabled = false;
			// ctx.webkitImageSmoothingEnabled = false;
			// ctx.msImageSmoothingEnabled = false;
			// ctx.imageSmoothingEnabled = false;
			const resizedDataUrl = canvas.toDataURL('image/jpeg');
			res(resizedDataUrl)
		}
		image.src = urlData
	})
}