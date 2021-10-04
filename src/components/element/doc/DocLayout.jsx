import styles from "./DocLayout.module.scss"
import { useEffect, useMemo } from 'react'
import { array } from "@priolo/jon-utils"

import HeaderCmp from "../HeaderCmp"
import BiblioEditable from "components/editor/BiblioEditable"

import { createEditor, Editor } from 'slate'
import { Slate, withReact } from 'slate-react'

import { useStore } from "@priolo/jon"
import { useEditorDialog } from "store/editorDialog"
import { useUrl } from "store/url"


export default function DocLayout({
	element,
}) {

	// HOOKs

	const { state: doc, fetch, setValue, getSelectedTypes } = useStore(element.identity)
	const { state: dialog, open: openDialog, close: closeDialog, setItemsIdSelect } = useEditorDialog()
	const { _update } = useUrl()

	useEffect(() => {
		fetch()
		_update()
	}, [])

	// useEffect(()=> {
	// 	console.log( "change selection")
	// },[editor.selection])

	//const editor = useMemo(() => withReact(createEditor()), [])


	// HANDLE

	const handleFocusEditor = e => {
		//openDialog({ position: e.target?.getBoundingClientRect()})
		openDialog({ position: { right: e.target.offsetLeft + e.target.offsetWidth } })
	}

	const handleBlurEditor = e => {
		closeDialog()
	}

	const handleChange = newValue => {
		setValue(newValue)
		const types = getSelectedTypes()
		setItemsIdSelect(types)
	}

	// RENDER

	return (
		<div className={styles.root} >

			<div className={styles.left}>
				<div className={styles.headerSpace} />
				<div className={styles.menu}>
					<div className={styles.link}>Link uno</div>
					<div className={styles.link}>Link due</div>
					<div className={styles.link}>Link tre</div>
					<div className={styles.link}>Link quattro</div>
					<div className={styles.link}>Link cinque</div>
				</div>
			</div>

			<div className={styles.center}>

				<HeaderCmp className={styles.header}
					title={doc.title}
					subtitle={doc.subtitle}
					date={doc.date}
					identity={element.identity}
				/>

				<div className={styles.body}>
					<Slate
						editor={doc.editor}
						value={doc.value}
						onChange={handleChange}
					>
						<BiblioEditable
							editor={doc.editor}
							onFocus={handleFocusEditor}
							onBlur={handleBlurEditor}
						/>
					</Slate>
				</div>

			</div>

			<div className={styles.right}></div>

		</div>
	)
}
