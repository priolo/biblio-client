import styles from "./MenuLayout.module.scss"

import Menu from "components/app/menu/Menu"
import { MAIN_MENU_ITEMS, useMenu } from "store/menu"
import { useUrl, ELEMENT_TYPE, composeIdentity } from "store/url"


export default function MenuLayout() {

	// HOOKs

	const { state: menu, getMain, getOpened, getSecondary } = useMenu()
	const { addIdentity, setHash } = useUrl()

	// HANDLEs

	const handleClickMain = (item) => {
		switch (item.name) {
			case MAIN_MENU_ITEMS.AUTHORS:
				addIdentity({ 
					identity: composeIdentity(ELEMENT_TYPE.AUTHORS), 
					focus: true 
				})
				break
		}
	}
	const handleClickOpened = (item) => {
		setHash(item.element.identity)
	}
	const handleClickSecondary = (item) => {
		switch (item.name) {
			case MAIN_MENU_ITEMS.LOGIN:
				addIdentity({ 
					identity: composeIdentity(ELEMENT_TYPE.LOGIN), 
					focus: true 
				})
				break
		}
	}

	// RENDER

	const main = getMain()
	const openend = getOpened()
	const secondary = getSecondary()

	return (
		<div className={styles.container}>

			<Menu className={styles.main}
				items={main}
				onClick={handleClickMain}
			/>

			<Menu className={styles.opened}
				items={openend}
				onClick={handleClickOpened}
			/>

			<div className={styles.gap} />

			<Menu className={styles.secondary}
				items={secondary}
				onClick={handleClickSecondary}
			/>

		</div>
	)
}

