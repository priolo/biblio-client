/* eslint eqeqeq: "off" */
import details from "./detail.mock"


const store = {
	state: {
		id: null,
		title: null,
		name: null,
		date: null,
		docs: [],
	},
	getters: {
	},
	actions: {
		fetch: (state, _, store) => {
			const detail = details.find(detail => detail.id == state.id)
			store._update(detail)
		}
	},
	mutators: {

	},
}

export default store

