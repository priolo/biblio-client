import { createStore } from "@priolo/jon"
import {addElementStore} from "store/doc"
import details from "./detail.mock"


const setup = {
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
		fetch: (_, {state, ...store}) => {
			const detail = details.find(detail => detail.id == state.id)
			store.setState(detail)
		}
	},
	mutators: {
		setState: state => state,
	},
}

export default setup


function createAuthorDetailStore( id ) {
	const newSetup = { ...setup }
	newSetup.state = { ...newSetup.state, id }
	const store = createStore(newSetup)
	addElementStore ( id, store )
}

export {
	createAuthorDetailStore
}