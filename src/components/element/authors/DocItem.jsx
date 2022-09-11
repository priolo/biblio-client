import styles from "./DocItem.module.scss"

import OptionsIcon from '/src/imeges/icons/OptionsIcon';
import Rating from "/src/components/app/Rating"
import ButtonIcon from "/src/components/app/ButtonIcon"


export default function DocItem({
	doc = null,
	className = "",
	selected,
	onClick,
	onDoubleClick,
}) {

	// HOOKs

	// HANDLE

	const handleClick = e => onClick({ doc }, e)
	const handleDoubleClick = _ => onDoubleClick(doc)
	const handleClickOptions = e => onClick({ doc, go: true }, e)

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
			<div className={styles.buttons}>
				<Rating className={styles.rating} />
				<ButtonIcon onClick={handleClickOptions}>
					<OptionsIcon />
				</ButtonIcon>
			</div>
		</div>
	)
}

