import styles from "./MenuLayout.module.scss"
import Menu from "components/app/menu/Menu"
import { useMenu } from "store/menu"
import { ELEMENT_TYPE, useElement } from "store/element"


export default function MenuLayout() {

	
	// HOOKs

	const { state: menu } = useMenu()
	const { open } = useElement()


	// HANDLEs

	const handleClick = (item) => {
		console.log(item)
		switch ( item.name ) {
			case "authors":
				open ( "authors" )
			break
		}
	}


	// RENDER
	const items = menu.all

	return (
		<div className={styles.container}>
			<Menu className={styles.menu}
				items={items}
				onClick={handleClick}
			/>
		</div>
	)
}

