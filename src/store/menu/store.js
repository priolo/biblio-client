/* eslint eqeqeq: "off" */
import { ELEMENT_TYPE, composeIdentity, getStoreUrl, haveIdentity, getUrlHash } from "store/url"
import { getStore } from "@priolo/jon"
import { MAIN_MENU_ITEMS } from "."


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
				name: MAIN_MENU_ITEMS.AUTHORS,
				selected: false,
				disabled: false,
			},
		],
		opened: [],
		secondary: [
			{
				label: "Login",
				name: MAIN_MENU_ITEMS.LOGIN,
				selected: false,
				disabled: false,
			},
			{
				label: "Register",
				name: MAIN_MENU_ITEMS.REGISTER,
				selected: false,
				disabled: false,
			},
		]
	},
	getters: {
		getMain: (state, _, store) => {
			return state.main.map ( item => {
				switch ( item.name ) {
					case "authors":
						item.selected = haveIdentity( composeIdentity(ELEMENT_TYPE.AUTHORS))
						break
				}
				return item
			})
		},
		getOpened: (state, _, store) => {
			const { getElements } = getStoreUrl()
			return getElements().reduce ( (items, element) => {
				if ( element.type != "doc" ) return items
				const { state:doc } = getStore(element.identity)
				const selected = getUrlHash() == element.identity
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