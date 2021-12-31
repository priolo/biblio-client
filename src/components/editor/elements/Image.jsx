import styles from "./Image.module.scss"
import { useRef } from 'react';
import { ReactEditor, useFocused, useSelected } from "slate-react"
import { useDocSelect } from "store/doc";
import { Transforms } from "slate";
import ButtonIcon from "components/app/ButtonIcon";
import BoldIcon from "imeges/icons/BoldIcon";


export default function ImageCmp({
	attributes,
	element,
	children
}) {

	// HOOKs
	const selected = useSelected()
	const focused = useFocused()
	const inputRef = useRef(null)
	const { state: docNs } = useDocSelect()


	// HANDLERs
	const handleClickPlaceholder = e => {
		inputRef.current.click()
	}
	const handleClickImg = e => {
		const path = ReactEditor.findPath(docNs.editor, element);
		Transforms.select(docNs.editor, path)
	}
	const handleRemoveImg = e => {
		const path = ReactEditor.findPath(docNs.editor, element);
		Transforms.setNodes(docNs.editor, { url: null }, {
			at: path,
			mode: 'highest',
			voids: true,
		})
	}
	const handleChangeFile = e => {
		const files = e.target.files
		const file = files[0];
		//const filesize = (file.size / 1024 / 1024).toFixed(4);
		//if (max > 0 && filesize > max) {
		// 	alert("Inviare file più piccoli di 5mb.");
		// 	return;
		//}
		const reader = new FileReader()
		reader.addEventListener('load', (e) => {
			//const url = reader.result
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
				var dataUrl = canvas.toDataURL('image/jpeg');
				const nodeUpdate = { url: dataUrl }
				const path = ReactEditor.findPath(docNs.editor, element);
				Transforms.setNodes(docNs.editor, nodeUpdate, {
					at: path,
					mode: 'highest',
					voids: true,
				})
			}
			image.src = e.target.result;
		})
		reader.readAsDataURL(file)
		inputRef.current.value = ""
	}

	// RENDER
	const cnImage = `${styles.image} ${selected && focused ? styles.focus : ''}`
	const cnRoot = `${styles.root} ${selected && focused ? styles.focus : ''}`
	const haveUrl = element.url && element.url.length > 0

	return (
		<div className={cnRoot} {...attributes}>

			{haveUrl ? (<>
				<ButtonIcon onClick={handleRemoveImg}>
					<BoldIcon />
				</ButtonIcon>
				<img
					contentEditable={false}
					className={cnImage}
					src={element.url}
					onClick={handleClickImg}
				/>
			</>) : (<>
				<div
					contentEditable={false}
					className={styles.placeholder}
					onClick={handleClickPlaceholder}
				>CLICCA QUA O DRAGGA IMMAGINE</div>
				<input
					ref={inputRef}
					type="file"
					//multiple="!singleFile"
					style={{ display: "none" }}
					onChange={handleChangeFile}
				/>
			</>)}

			<div className={styles.description}>{children}</div>

		</div>
	)
}