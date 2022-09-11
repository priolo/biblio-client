import styles from "./DocLayout.module.scss"
import { useEffect, useRef } from 'react'

import HeaderCmp from "../HeaderCmp"
import BiblioEditable from "components/editor/BiblioEditable"

import { ReactEditor, Slate } from 'slate-react'

import typeDialogStore from "store/doc/dialogs/type"

import EditLinkPopUp from 'components/editor/components/LinkPopUp';
import EditTypeDialog from 'components/editor/components/EditTypeDialog';
import { getElementStore } from "store/doc"
import { useStore } from "@priolo/jon"


export default function DocLayout({
	element,
}) {

	// HOOKs
	const store = getElementStore(element.identity)
	const doc = useStore(store)
	const dialog = useStore(typeDialogStore)

	useEffect(() => {
		store.fetch()
	}, [])

	// se la "type_dialog" è cambiata in "open"
	useEffect(() => {
		if (dialog.isEditorCodeOpen) return
		ReactEditor.focus(doc.editor)
	}, [dialog.isEditorCodeOpen])


	// HANDLE
	const handleFocusEditor = e => {
	}

	const handleBlurEditor = e => {
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
					element={element}
				/>

				<div className={styles.body}>

					<Slate
						editor={doc.editor}
						value={doc.editor.children}
					>
						<BiblioEditable
							element={element}
							onFocus={handleFocusEditor}
							onBlur={handleBlurEditor}
						/>
					</Slate>

					<EditLinkPopUp element={element} />

				</div>

			</div>

			<div className={styles.right}></div>

			<EditTypeDialog element={element} />

		</div>
	)
}
