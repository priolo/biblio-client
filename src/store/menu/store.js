/* eslint eqeqeq: "off" */
import { ELEMENT_TYPE, getIdentity } from "store/element"
import { getStoreUrl } from "store/url"
import { getStore } from "@priolo/jon"
import ajax from "../../plugins/AjaxService"


const store = {
	state: {
		main: [
			{
				label: "Search",
				name: "search",
				selected: false,
				disabled: false,
			},
			{
				label: "Liked",
				name: "heart",
				selected: false,
				disabled: false,
			},
			{
				label: "News",
				name: "news",
				selected: false,
				disabled: false,
			},
			{
				label: "Authors",
				name: "authors",
				selected: false,
				disabled: false,
			},
		],
		opened: [],
		secondary: [
			{
				label: "Login",
				name: "login",
				selected: false,
				disabled: false,
			},
			{
				label: "Register",
				name: "register",
				selected: false,
				disabled: false,
			},
		]
	},
	getters: {
		getMain: (state, _, store) => {
			const { haveIdentity } = getStoreUrl()
			return state.main.map ( item => {
				switch ( item.name ) {
					case "authors":
						item.selected = haveIdentity( getIdentity(ELEMENT_TYPE.AUTHORS))
						break
				}
				return item
			})
		},
		getOpened: (state, _, store) => {
			const { getElements, getHash } = getStoreUrl()
			return getElements().reduce ( (items, element) => {
				if ( element.type != "doc" ) return items
				const { state:doc } = getStore(element.identity)
				const selected = getHash() == element.identity
				items.push({
					label: doc.title,
					element,
					selected, 
				})
				return items
			}, [])
		},
		getSecondary: (state, _, store) => {
			return state.secondary
		}
	},
	actions: {
	},
	mutators: {
		setMain: (state, all) => ({ all }),
	},
}

export default store