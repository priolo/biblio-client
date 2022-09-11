import styles from "./MenuLayout.module.scss"

import Menu from "/src/components/app/menu/Menu"
import menuStore, { MAIN_MENU_ITEMS } from "/src/store/menu"
import { ELEMENT_TYPE, composeIdentity } from "/src/store/url/utils"
import storeUrl  from "/src/store/url"


export default function MenuLayout() {

	// HOOKs

	//const menu = useStore(storeMenu)
	const { getMain, getOpened, getSecondary} = menuStore
	const { addIdentity, setHash } = storeUrl

	// HANDLEs

	const handleClickMain = (item) => {
		switch (item.name) {
			case MAIN_MENU_ITEMS.AUTHORS:
				console.log(ELEMENT_TYPE.AUTHORS)
				console.log( composeIdentity(ELEMENT_TYPE.AUTHORS))
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

			{/* MENU' PRINCIPALE IN ALTO */}
			<Menu className={styles.main}
				items={main}
				onClick={handleClickMain}
			/>

			{/* DOCUMENTI APERTI */}
			<Menu className={styles.opened}
				items={openend}
				onClick={handleClickOpened}
			/>

			<div className={styles.gap} />

			{/* MENU' SECONDARIO */}
			<Menu className={styles.secondary}
				items={secondary}
				onClick={handleClickSecondary}
			/>

		</div>
	)
}

