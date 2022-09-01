import styles from "./Menu.module.scss"
import MenuItem from "./MenuItem"


/**
 * Visualizza un MENU
```
item = {
	label: string,
	name: any,
	selected: bool,
	disabled: bool,
}
items = item[]
```
 */
export default function Menu({
	items,
	onClick,
	className="",
}) {
	

	// HANDLERs

	const handleClick = item => {
		onClick(item)
	}


	// RENDER

	if (!items || items.length == 0) return null

	return (<div className={`${styles.container} ${className}`}>
		{items?.map((item, index) => (

			<MenuItem 
				key={index}
				item={item}
				onClick={(e) => handleClick(item)}
			/>

		)) ?? null}
	</div>)
}

