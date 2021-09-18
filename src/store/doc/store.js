/* eslint eqeqeq: "off" */
import docs from "./docs.mock"

const store = {
	state: {
		author: "",
		title: "",
		subtitle: "",
		date: "",
		value: [
			{
				type: 'paragraph',
				children: [{ text: 'A line of text in a paragraph.' }],
			},
		],
	},
	getters: {
	},
	actions: {
		fetch: (state, _, store) => {
			// const doc = docs.find(doc => doc.id == state.id)
			// const newState = { ...state, ...doc }
			// store._update(newState)
		}
	},
	mutators: {
		setValue: (state, value) => ({value}),
	},
}

export default store