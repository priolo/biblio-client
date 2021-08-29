import styles from "./FinderCmp.module.scss"

import Input from "components/app/Input"
import CancelIcon from "imeges/icons/CancelIcon"
import FindIcon from "imeges/icons/FindIcon"
import ButtonIcon from "components/app/ButtonIcon"





export default function FinderCmp({
	value,
	onChange,
}) {
	return (
		<div className={styles.container}>
			<Input 
				value={value} 
				onChange={onChange} 
				renderEnd={	<ButtonIcon><FindIcon /></ButtonIcon> }
			/>
		</div>
	)
}

