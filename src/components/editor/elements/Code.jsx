import styles from "./Code.module.scss"
import { useEffect, useMemo, useState } from "react";

import { useFocused, useSelected } from "slate-react"
import { Node } from "slate"
import { useMonaco } from "@monaco-editor/react";

import ButtonIcon from "components/app/ButtonIcon";
import BoldIcon from "imeges/icons/BoldIcon";
import codeDialogStore from "store/doc/dialogs/code";
import { getTextFromElement } from "store/doc/utils";
import { getElementStore } from "store/doc";


export default function Code({ 
	attributes, 
	element,
	doc,
	children, 
}) {

	// HOOKs
	const [html, setHtml] = useState("")
	const { state: docNs, getEntryFromElement, getIdentity } = getElementStore(doc.identity)
	const { setIsEditorCodeOpen, setCodeInEdit, setEntryInEdit, setDocId } = codeDialogStore
	const monaco = useMonaco()
	const selected = useSelected()
	const focused = useFocused()
	
	// recupero tutto il "text" presente nell' "element"
	const text = useMemo(() => getTextFromElement(element), [element])

	// ricavo l'html dal testo in base al linguaggio usato
	useEffect(async () => {
		if (!monaco) return
		const res = await monaco.editor.colorize(text, "javascript")
		setHtml(res ?? "")
	}, [monaco, text])


	// HANDLERs
	const handleClickEdit = e => {
		const entry = getEntryFromElement(element)
		if (!entry) return
		setDocId(getIdentity())
		setEntryInEdit(entry)
		setCodeInEdit(text)
		setIsEditorCodeOpen(true)
	}


	// RENDER
	if (!docNs) return null	
	const haveFocus = selected && focused
	const cnRoot = `${styles.root} ${haveFocus ? styles.focus : ''}`

	return <div className={cnRoot} {...attributes}>
		<div className={styles.container}>

			{/* questo blocco serve a Slate per non generare un errore */}
			<div style={{ display: "none" }}>{children}</div>

			<ButtonIcon onClick={handleClickEdit}>
				<BoldIcon />
			</ButtonIcon>

			<div dangerouslySetInnerHTML={{ __html: html }} />

		</div>
	</div>
}