import styles from "./Chapter.module.scss"

import { useFocused, useSelected } from "slate-react"


export default function Chapter({
	attributes, // slate
	children
}) {

	const selected = useSelected()
	const focused = useFocused()
	 
	const cnText = `${styles.root} ${selected && focused ? styles.focus : ''}`

	return (
		<p className={cnText} {...attributes}>
			{children}
		</p>
	)
}