import { useFocused, useSelected } from "slate-react"
import styles from "./Paragraph.module.scss"


export default function Paragraph({
	attributes, 
	element,
	doc,
	children, 
}) {

	// HOOKs
	const selected = useSelected()
	const focused = useFocused()
	 

	// RENDER
	const cnText = `${styles.root} ${selected && focused ? styles.focus : ''}`
	return ( 
		<p className={cnText} {...attributes}>
			{children}
		</p>
	)
}