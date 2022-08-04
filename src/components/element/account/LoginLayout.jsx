import styles from "./LoginLayout.module.scss"

import CloseIcon from "imeges/close"
import Control from "components/app/Control"
import Button from "components/app/Button"
import Input from "components/app/Input"

import storeAuth from "store/auth"
import HeaderCmp from "../HeaderCmp"
import {useStore} from "@priolo/jon"



function LoginLayout({
	element,
}) {

	// HOOKs
	const auth = useStore(storeAuth)
	const { setPassword, setEmail, login } = storeAuth


	// HANDLEs
	const handleClickEnter = e => login()
	const handleChangePassword = e => setPassword(e.target.value)
	const handleChangeEmail = e => setEmail(e.target.value)


	return (
		<div className={styles.container}>

			<HeaderCmp
				title="LOGIN"
				subtitle=""
				date=""
				element={element}
			/>

			<div className={styles.body}>
				<Control label="Email">
					<Input
						value={auth.email}
						onChange={handleChangeEmail}
					/>
				</Control>
				<Control label="Password">
					<Input
						value={auth.password}
						onChange={handleChangePassword}
					/>
				</Control>
				<Button onClick={handleClickEnter}>
					Enter
				</Button>
			</div>

		</div>
	)
}

export default LoginLayout