
import CancelIcon from "imeges/icons/CancelIcon"
import styles from "./HeaderCmp.module.scss"




export default function HeaderCmp({
	title,
	subtitle,
	date,
	onClose,
	onIconize,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.up}>
				<div className={styles.title}>
					{title}
				</div>
				<div className={styles.icons}>
					<CancelIcon />
				</div>
			</div>
			<div className={styles.down}>
				<div className={styles.subtitle}>
					{subtitle}
				</div>
				<div className={styles.date}>
					{date}
				</div>
			</div>
		</div>
	)
}

