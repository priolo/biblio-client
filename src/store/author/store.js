/* eslint eqeqeq: "off" */
import authors from "./author.mock"


const store = {
	state: {
		all: authors,
		selected: [],
	},
	getters: {
		isSelected: (state, id, store) => state.selected.includes(id)
	},
	actions: {
		toggleSelected: (state, id, store) => {
			if (store.isSelected(id)) {
				store.removeSelected(id)
			} else {
				store.addSelected(id)
			}
		}
	},
	mutators: {
		addSelected: (state, id, store) => {
			if (state.selected.includes(id)) return state
			return { selected: state.selected.concat(id) }
		},
		removeSelected: (state, id, store) => {
			return {
				selected: state.selected.filter(idSelect => idSelect != id)
			}
		},

	},
}

export default store

