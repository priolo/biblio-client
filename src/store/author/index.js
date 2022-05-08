import { createStore } from "@priolo/jon"
import authors from "./author.mock"


const store = createStore({
	state: {
		all: authors,
	},
	getters: {
	},
	actions: {
	},
	mutators: {
	},
})

export default store

