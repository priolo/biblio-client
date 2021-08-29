
import styles from "./TextEditorCmp.module.scss"

export default function TextEditorCmp() {

	// HOOKs
	
	// HANDLEs
	// const handleChangeCode = e => setActivationToken(e.target.value)
	// const handleChangePassword = e => setPassword(e.target.value)
	// const handleClickActivate = e => activate()

	// RENDER

	return (
		<div 
			className={styles.editor}
			contentEditable={true}
		>Pippo</div>
	)
}

