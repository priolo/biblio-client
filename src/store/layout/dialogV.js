/* eslint eqeqeq: "off" */

const store = {
	state: {
		isDialogVOpen: false, 
	},
	actions: {
	},
	mutators: {
		setDialogVOpen: (state, isDialogVOpen) => ({isDialogVOpen}),
	},
}

export default store
