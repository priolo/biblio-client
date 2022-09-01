import styles from "./HeaderCmp.module.scss"

import ButtonIcon from "components/app/ButtonIcon"
import CancelIcon from "imeges/icons/CancelIcon"
import { getUrlByIdentity } from "store/url/utils"
import urlStore from "store/url"
import { clipboard } from "@priolo/jon-utils"



export default function HeaderCmp({
	title,
	subtitle,
	date,
	element,
}) {

	// HOOKs
	const { removeIdentity } = urlStore


	// HANDLERs
	const handleClose = event => {
		event.stopPropagation();
		event.preventDefault();
		removeIdentity(element.identity)
	}
	const handleCopyLink = event => {
		const url = getUrlByIdentity(element.identity)
		clipboard.set(url)
	}


	// RENDER
	const linkVisible = !!element?.identity

	return (
		<div className={styles.container}>
			<div className={styles.up}>
				<div className={styles.title}>
					{title}
				</div>
				<div className={styles.icons}>
					<ButtonIcon onClick={handleClose}>
						<CancelIcon />
					</ButtonIcon>
					{linkVisible && <ButtonIcon onClick={handleCopyLink}>
						L
					</ButtonIcon>}
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

