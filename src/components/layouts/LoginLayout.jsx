
import CloseIcon from "../../imeges/close"
import Control from "../app/Control"
import Button from "../app/Button"
import Input from "../app/Input"

import styles from "./loginLayout.module.scss"
import { useAuth } from "../../store/auth"



function LoginLayout() {

	// HOOKs
	const { state: auth, setPassword, setEmail, login } = useAuth()


	// HANDLEs
	const handleClickEnter = e => login()
	const handleChangePassword = e => setPassword(e.target.value)
	const handleChangeEmail = e => setEmail(e.target.value)

	
	return (
		<div className={styles.container}>

			<div className={styles.left}>
			</div>

			<div className={styles.center}>

				<div className={styles.header}>
					<div className={styles.title}>LOGIN</div>
				</div>

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

			<div className={styles.rigth}>
				<div className={styles.icons}>
					<Button icon={<CloseIcon />} />
				</div>
			</div>

		</div>
	)
}

export default LoginLayout