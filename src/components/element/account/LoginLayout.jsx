import styles from "./LoginLayout.module.scss"

import CloseIcon from "imeges/close"
import Control from "components/app/Control"
import Button from "components/app/Button"
import Input from "components/app/Input"

import { useAuth } from "store/auth"
import HeaderCmp from "../HeaderCmp"



function LoginLayout({
	element,
}) {

	// HOOKs
	const { state: auth, setPassword, setEmail, login } = useAuth()


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