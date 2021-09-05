import styles from "./HeaderCmp.module.scss"

import ButtonIcon from "components/app/ButtonIcon"
import CancelIcon from "imeges/icons/CancelIcon"
import { useUrl } from "store/url"



export default function HeaderCmp({
	title,
	subtitle,
	date,
	identity,
}) {

	// HOOKs

	const { removeIdentity } = useUrl()

	// HANDLERs

	const handleOnClose = event => {
		event.stopPropagation();
    	event.preventDefault();
		removeIdentity ( identity )
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

