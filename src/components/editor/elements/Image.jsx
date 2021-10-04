import { useFocused, useSelected } from "slate-react"
import styles from "./Image.module.scss"


export default function Image({
	attributes, element, // slate
	children
}) {

	const selected = useSelected()
	const focused = useFocused()

	const cnImage = `${styles.image} ${selected && focused ? styles.focus : ''}`

	return (
		<div {...attributes} className={styles.root}>
			<div contentEditable={false}>
				<img 
					className={cnImage}
					src={element.url}
				/>
			</div>
			{children}
		</div>
	)
}