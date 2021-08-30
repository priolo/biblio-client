import styles from "./DocItem.module.scss"

import Rating from "components/app/Rating"


export default function DocItem({
	doc = null,
	className = "",
	selected,
	onClick,
	onDoubleClick,
}) {

	// HOOKs

	// HANDLE

	const handleClick = _ => onClick(doc)
	const handleDoubleClick = _ => onDoubleClick(doc)

	// RENDER

	if (!doc) return null
	const cnContainer = `${styles.container} ${selected ? styles.selected : ""} ${className}`

	return (
		<div
			className={cnContainer}
			onClick={handleClick}
			onDoubleClick={handleDoubleClick}
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

