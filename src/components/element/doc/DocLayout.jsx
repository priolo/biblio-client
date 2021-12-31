import styles from "./DocLayout.module.scss"
import { useEffect, useRef } from 'react'

import HeaderCmp from "../HeaderCmp"
import BiblioEditable from "components/editor/BiblioEditable"

import { ReactEditor, Slate } from 'slate-react'

import { useStore } from "@priolo/jon"
import { useEditorDialog } from "store/editorDialog"
import { useUrl } from "store/url"


export default function DocLayout({
	element,
}) {

	// HOOKs

	const docStore = useStore(element.identity)
	const { state: doc, fetch, setValue, getSelectedTypes } = docStore
	const { state: dialog, open: openDialog, close: closeDialog, setItemsIdSelect } = useEditorDialog()
	const { _update } = useUrl()

	useEffect(() => {
		fetch()
		_update()
	}, [])

	const slateRef = useRef(null)

	useEffect(()=>{
		//if ( dialog.isEditorCodeOpen || !slateRef.current ) return
		if ( dialog.isEditorCodeOpen ) return
		ReactEditor.focus(doc.editor)
	},[dialog.isEditorCodeOpen])


	// HANDLE

	const handleFocusEditor = e => {
		console.log("focus")
		//openDialog({ position: e.target?.getBoundingClientRect()})
		openDialog({ position: { right: e.target.offsetLeft + e.target.offsetWidth } })
	}

	const handleBlurEditor = e => {
		console.log("blur")
		closeDialog()
	}

	const handleChange = newValue => {
		console.log("change")
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
						ref={slateRef}
						editor={doc.editor}
						value={doc.value}
						onChange={handleChange}
					>
						<BiblioEditable
							store={docStore}
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
