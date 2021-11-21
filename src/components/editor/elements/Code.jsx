import styles from "./Code.module.scss"

import { useEffect, useMemo, useState } from "react";
import * as monaco from 'monaco-editor';

//import { useFocused, useSelected } from "slate-react"
import { Node } from "slate"



// 	attributes: {
// 		data-slate-node: "element"
// 		ref: { current: p.Text_root__3YA7I }
// 	},
// 	children: [...],
// 	element: {
// 		children: [
// 			{ text: 'descrizione del secondo paragrafo' }
// 		],
// 		type: "code"
// 	}
export default function Code(props) {
	const { attributes, children, element } = props
	//const selected = useSelected()
	//const focused = useFocused()



	// if (focused) {
	// 	return <p className={styles.root} {...attributes}>
	// 		{children}
	// 	</p>
	// }

	const [html, setHtml] = useState("")

	const text = useMemo(() => {
		return [...Node.texts(element)].map(t => t[0].text).join("\n")
	}, [element])

	useEffect(async () => {
		const res = await monaco.editor.colorize(text, "javascript")
		setHtml(res)
	}, [text])

	return <div
		{...attributes}
		className={styles.root}
		contentEditable={false}
	>
		<div className={styles.container}>
			
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	</div>

}