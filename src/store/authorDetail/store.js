/* eslint eqeqeq: "off" */



const store = {
	state: {
		name: "Priolo kdf",
		docs: [
			{ id: 1, title: "Persefone", subtitle: "Priolo22", date: "14/08/1975" },
			{ id: 2, title: "Persefone", subtitle: "Priolo22", date: "14/08/1975" },
			{ id: 3, title: "Persefone", subtitle: "Priolo22", date: "14/08/1975" },
		],
		selected: [],
	},
	getters: {
		isSelected: (state, id, store) => state.selected.includes(id),
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
		setName: (state, name, store) => ({name}),
	},
}

export default store

