
import ButtonIcon from "components/app/ButtonIcon"
import CancelIcon from "imeges/icons/CancelIcon"
import { useElement } from "store/element"
import styles from "./HeaderCmp.module.scss"




export default function HeaderCmp({
	title,
	subtitle,
	date,
	identity,
}) {

	// HOOKs

	const { close } = useElement()

	// HANDLERs

	const handleOnClose = _ => {
		close ( identity )
	}

	// RENDER

	return (
		<div className={styles.container}>
			<div className={styles.up}>
				<div className={styles.title}>
					{title}
				</div>
				<div className={styles.icons}>
					<ButtonIcon onClick={handleOnClose}>
						<CancelIcon />
					</ButtonIcon>
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

