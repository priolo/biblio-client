import styles from "./DocLayout.module.scss"
import { useEffect } from 'react'
import { array } from "@priolo/jon-utils"

import HeaderCmp from "../HeaderCmp"
import BiblioEditable from "components/editor/BiblioEditable"

import { Editor } from 'slate'
import { Slate } from 'slate-react'

import { useStore } from "@priolo/jon"
import { useEditorDialog } from "store/editorDialog"
import { useUrl } from "store/url"


export default function DocLayout({
	element,
}) {

	// HOOKs

	const { state: doc, fetch, setValue } = useStore(element.identity)
	const { state: dialog, open: openDialog, close: closeDialog, setItemsIdSelect } = useEditorDialog()
	const { _update } = useUrl()

	useEffect(() => {
		fetch()
		_update()
	}, [])

	// useEffect(()=> {
	// 	console.log( "change selection")
	// },[editor.selection])


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
		const entries = Editor.nodes(doc.editor, { match: n => n.type != null })
		const entriesArr = [...entries]
		const groupsEntries = array.groupBy(entriesArr, (e1, e2) => e1[0].type == e2[0].type)
		const groupTypes = groupsEntries.map(groupEntries => groupEntries[0][0].type)
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
	)
}
