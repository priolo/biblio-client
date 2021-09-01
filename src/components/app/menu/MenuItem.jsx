import styles from "./MenuItem.module.scss"

import Icons from "./Icons"


export default function MenuItem({
	item,
	onClick,
}) {


	// RENDER

	const cnLabel = `${styles.label} ${item.selected?styles.selected:""}`

	return (
		<div className={styles.container}
			onClick={onClick}
		>
			{item.name && <Icons className={styles.icon} name={item.name} />}
			<div className={cnLabel}>
				{item.label}
			</div>
		</div>
	)

}