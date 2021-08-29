import Icons from "./Icons"
import styles from "./MenuItem.module.scss"

export default function MenuItem({
	item,
	onClick,
}) {


	// RENDER

	return (
		<div className={styles.container}
			onClick={onClick}
		>
			{item.name && <Icons className={styles.icon} name={item.name} />}
			<div className={styles.label}>
				{item.label}
			</div>
		</div>
	)

}