import styles from './EditCodeDialog.module.scss'

import Button from 'components/app/Button';
import Dialog from 'components/app/Dialog';
import codeDialogStore from 'store/doc/dialogs/code';
import Editor from "@monaco-editor/react";
import {useStore} from '@priolo/jon';


/**
 * E' la DIALOG che permette di editare il codice
 */
export default function EditCodeDialog({
}) {

	// HOOKs
	const dialogNs = useStore(codeDialogStore)
	const { setIsEditorCodeOpen, setCodeInEdit, updateCode, resetFocus } = codeDialogStore
	

	// HANDLEs
	const handleClose = e => {
		setIsEditorCodeOpen(false)
		resetFocus()
	}

	const handleUpdate = e => {
		updateCode()
		handleClose()
	}

	const handleMount = editor => {}

	const handleChange = (value, evn) => {
		setCodeInEdit(value)
	}


	// RENDER
	return (
		<Dialog width="50%"
			isOpen={dialogNs.isEditorCodeOpen}
			onClose={handleClose}
			renderHead={<div>titolo del codice</div>}
			renderFooter={<>
				<Button
					onClick={handleClose}
				>Cancel</Button>
				<Button	type="primary"
					onClick={handleUpdate}
				>Update</Button>
			</>}
		>
			<Editor
				height="300px"
				defaultLanguage="javascript"
				value={dialogNs.codeInEdit}
				onMount={handleMount}
				onChange={handleChange}
			/>
		</Dialog>
	)
}