import styles from "./Code.module.scss"
import { useEffect, useMemo, useState } from "react";

import { useFocused, useSelected } from "slate-react"
import { Node } from "slate"
import { useMonaco } from "@monaco-editor/react";

import ButtonIcon from "components/app/ButtonIcon";
import BoldIcon from "imeges/icons/BoldIcon";
import { useCodeDialog } from "store/doc/dialogs/code";
import { useDocSelect } from "store/doc";


export default function Code(props) {
	const { attributes, children, element } = props


	// HOOKs
	const { state: docNs, getEntryByElement, getIdentity } = useDocSelect()
	if (!docNs) return null
	const { setIsEditorCodeOpen, setCodeInEdit, setEntryInEdit, setDocId } = useCodeDialog()
	const monaco = useMonaco()
	const selected = useSelected()
	const focused = useFocused()
	const [html, setHtml] = useState("")



	const text = useMemo(() => {
		return [...Node.texts(element)].map(t => t[0].text).join("\n")
	}, [element])

	useEffect(async () => {
		if (!monaco) return
		const res = await monaco.editor.colorize(text, "javascript")
		setHtml(res ?? "")
	}, [monaco, text])


	// HANDLERs
	const handleClickEdit = e => {
		const entry = getEntryByElement(element)
		if (!entry) return
		setDocId(getIdentity())
		setEntryInEdit(entry)
		setCodeInEdit(text)
		setIsEditorCodeOpen(true)
	}


	// RENDER
	const haveFocus = selected && focused
	const cnRoot = `${styles.root} ${haveFocus ? styles.focus : ''}`

	return <p className={cnRoot} {...attributes}
	//contentEditable={false}
	>
		<div className={styles.container}>
			{/* questo blocco serve a Slate per non generare un errore */}
			<div style={{ display: "none" }}>{children}</div>

			<ButtonIcon onClick={handleClickEdit}>
				<BoldIcon />
			</ButtonIcon>

			<div dangerouslySetInnerHTML={{ __html: html }} />

		</div>
	</p>

}