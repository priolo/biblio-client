import styles from "./DocLayout.module.scss"
import { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { array } from "@priolo/jon-utils"

import { useStore } from "@priolo/jon"

import HeaderCmp from "../HeaderCmp"
import { useUrl } from "store/url"


// Import the Slate components and React plugin.
import { createEditor, Editor } from 'slate'
import { Slate, withReact } from 'slate-react'
import BiblioEditable from "components/editor/BiblioEditable"
import { useEditorDialog } from "store/editorDialog"



export default function DocLayout({
	element,
}) {

	// HOOKs

	const { state: doc, fetch, setValue } = useStore(element.identity)
	const { state: dialog, open: openDialog,  close: closeDialog, setItemsIdSelect } = useEditorDialog()
	const { _update } = useUrl()

	const editor = useMemo(() => withReact(createEditor()), [])

	useEffect(() => {
		fetch()
		_update()
	}, [])

	useEffect(()=> {
		console.log( "change selection")
	},[editor.selection])


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
		// console.log( editor )
		// if ( editor.value.selection != newValue.selection ) {
		// 	console.log( "change" )
		// }
		// 	console.log( "altro" )
		// }
		//console.log(editor.value.selection)
		const entries = Editor.nodes ( editor,{ match: n => n.type != null} )
		const entriesArr = [...entries]
		const groupsEntries = array.groupBy ( entriesArr, (e1, e2) => e1[0].type == e2[0].type )
		const groupTypes = groupsEntries.map( groupEntries => groupEntries[0][0].type )
		setItemsIdSelect(groupTypes)
	}

	// RENDER

	return (
		<div className={styles.container} >

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

				<HeaderCmp
					title={doc.title}
					subtitle={doc.subtitle}
					date={doc.date}
					identity={element.identity}
				/>

				<Slate
					editor={editor}
					value={doc.value}
					onChange={handleChange}
				>
					<BiblioEditable
						editor={editor}
						onFocus={handleFocusEditor}
						onBlur={handleBlurEditor}
					/>
				</Slate>

			</div>

		</div>
	)
}
