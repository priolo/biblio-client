import styles from './Item.module.scss'


export default function Item({
	item,
	onClick,
	isSelect,
}) {

	// HOOKs

	
	// HANDLE
	const handleClick = e => onClick(item, e)


	// RENDER
	const cnRoot = `${styles.root} ${isSelect ? styles.select : ""}`

	return (
		<div className={cnRoot}
			onClick={handleClick}
		>
			{item.label}
		</div>
	)
}
