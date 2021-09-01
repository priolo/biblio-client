import styles from "./MenuLayout.module.scss"

import Menu from "components/app/menu/Menu"
import { useMenu } from "store/menu"
import { getIdentity } from "store/element"
import { useUrl } from "store/url"


export default function MenuLayout() {

	// HOOKs

	const { state: menu, getMain, getOpened } = useMenu()
	const { addIdentity, haveIdentity } = useUrl()

	// HANDLEs

	const handleClick = (item) => {
		console.log(item)
		switch (item.name) {
			case "authors":
				addIdentity({ 
					identity: getIdentity("authors"), 
					focus: true 
				})
				break
		}
	}

	// RENDER

	const main = getMain()
	const openend = getOpened()

	return (
		<div className={styles.container}>
			<Menu className={styles.menu}
				items={main}
				onClick={handleClick}
			/>
			<Menu className={styles.menu}
				items={openend}
				onClick={handleClick}
			/>

		</div>
	)
}

