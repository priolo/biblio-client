/* eslint eqeqeq: "off" */
//import i18n from "i18next";

// used when dialog closed
let resolveClose = null;

const DIALOG_TYPES = {
	INFO: "info",
	WARNING: "warning",
	ERROR: "error",
	SUCCESS: "success",
}

const optionsDefault = {
	title: "", 
	text: "", 
	labelOk: "Ok", 
	labelCancel: null, 
	modal: true,
	type: DIALOG_TYPES.INFO,
}

const setup = {
	state: {
		dialogIsOpen: false,
		dialogOptions: optionsDefault,
	},
	actions: {
		dialogOpen: ( options, {store}) => {
			store.setDialogOpen(options)
			return new Promise((resolve, reject) => {
				resolveClose = resolve
			})
		},
		dialogClose: (response, {store}) => {
			store.setDialogClose()
			if (resolveClose) resolveClose(response)
			resolveClose = null
			//store._update()
		}
	},
	mutators: {
		setDialogOpen: options => {
			options = { ...optionsDefault, ...options }
			//if (options.type && options.modal) {
				//const path = `dialog.${options.type}.default`
				// options = {
				// 	title: i18n.t(`${path}.title`),
				// 	text: i18n.t(`${path}.text`),
				// 	labelOk: i18n.t(`${path}.ok`),
				// 	...options
				// }
			//}
			return {
				dialogOptions: options,
				dialogIsOpen: true
			}
		},
		setDialogClose: () => ({ dialogIsOpen: false }),
	},
}

export default setup
export {
	DIALOG_TYPES
}
