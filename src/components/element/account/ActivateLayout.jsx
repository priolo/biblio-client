
import CloseIcon from "../../../imeges/close"
import Control from "../../app/Control"
import Button from "../../app/Button"
import Input from "../../app/Input"

import styles from "./activateLayout.module.scss"
import { useAuth } from "../../../store/auth"



function ActivateLayout() {

	// HOOKs
	const { state: auth, setActivationToken, setPassword, activate } = useAuth()

	// HANDLEs
	const handleChangeCode = e => setActivationToken(e.target.value)
	const handleChangePassword = e => setPassword(e.target.value)
	const handleClickActivate = e => activate()

	// RENDER

	return (
		<div className={styles.container}>

			<div className={styles.left}>
			</div>


			<div className={styles.center}>

				<div className={styles.header}>
					<div className={styles.title}>ACTIVATE</div>
				</div>

				<div className={styles.body}>
					<Control label="Password">
						<Input
							value={auth.password}
							onChange={handleChangePassword}
						/>
					</Control>
					<Control label="Code">
						<Input
							value={auth.activationToken}
							onChange={handleChangeCode}
						/>
					</Control>
					<Button onClick={handleClickActivate}>
						Activate
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

export default ActivateLayout