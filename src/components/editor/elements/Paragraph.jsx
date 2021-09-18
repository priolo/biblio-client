import { useRef, useState } from "react"
import { useFocused, useSelected } from "slate-react"
import styles from "./Paragraph.module.scss"


export default function Paragraph({
	attributes, // slate
	children
}) {
	const selected = useSelected()
	const focused = useFocused()

	// const [focus, setFocus] = useState(false)
	// const handleFocus = e => {
	// 	setFocus(true)
	// }
	// const handleBlur = e => {
	// 	setFocus(false)
	// }





	//const ref = useRef(null)

	// const selection = window.getSelection().anchorNode
	// if ( selection ) debugger
	// console.log( selection)
	// console.log( selection == ref.current)
	// console.log( "----------")
	 
	const cnText = `${styles.text} ${selected && focused ? styles.focus : ''}`

	return ( 
		<p className={cnText} {...attributes}
			// onFocus={handleFocus}
			// onBlur={handleBlur}
		>
			{children}
		</p>
	)
}