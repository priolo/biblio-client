import styles from "./LoginLayout.module.scss"

import CloseIcon from "/src/imeges/close"
import Control from "/src/components/app/Control"
import Button from "/src/components/app/Button"
import Input from "/src/components/app/Input"

import authStore from "/src/store/auth"
import HeaderCmp from "../HeaderCmp"
import {useStore} from "@priolo/jon"



function LoginLayout({
	element,
}) {

	// HOOKs
	const auth = useStore(authStore)
	const { setPassword, setEmail, login } = authStore


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