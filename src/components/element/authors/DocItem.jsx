import styles from "./DocItem.module.scss"


import Rating from "components/app/Rating"
import { useAuthorDetail } from "store/authorDetail"
import { useElement } from "store/element"



export default function DocItem({
	doc = null,
	className = "",
}) {

	// HOOKs

	const { state:author, isSelected, toggleSelected } = useAuthorDetail()
	const { open } = useElement()

	// HANDLE

	const handleClick = _ => {
		toggleSelected(doc.id)
	}
	const handleDblClick = _ => {
		open ( "doc_1")
	}


	// RENDER

	if (!doc) return null

	const selected = isSelected(doc.id)
	const cnContainer = `${styles.container} ${selected ? styles.selected : ""} ${className}`

	return (
		<div
			className={cnContainer}
			onClick={handleClick}
			onDoubleClick={handleDblClick}
		>
			<div className={styles.first}>
				{doc.title}
			</div>
			<div className={styles.second}>
				<div
					className={styles.subtitle}
				>{doc.subtitle}</div>
				<div
					className={styles.date}
				>{doc.date}</div>
			</div>
			<Rating className={styles.rating} />
		</div>
	)
}

