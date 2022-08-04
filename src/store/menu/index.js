/* eslint eqeqeq: "off" */
import { ELEMENT_TYPE, composeIdentity, haveIdentity, getUrlHash } from "store/url/utils"
import storeUrl from "store/url"
import {getElementStore} from "store/doc"
import {createStore} from "@priolo/jon"


export const MAIN_MENU_ITEMS = {
	AUTHORS: "authors",
	LOGIN: "login",
	REGISTER: "register",
}

const setup = {
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
		getMain: ( _, {state}) => {
			return state.main.map ( item => {
				switch ( item.name ) {
					case "authors":
						item.selected = haveIdentity(composeIdentity(ELEMENT_TYPE.AUTHORS))
						break
				}
				return item
			})
		},
		getOpened: () => {
			const { getElements } = storeUrl
			return getElements().reduce ( (items, element) => {
				if ( element.type != "doc" ) return items
				const { state:doc } = getElementStore(element.id)
				const selected = getUrlHash() == element.identity
				items.push({
					label: doc.title,
					element,
					selected, 
				})
				return items
			}, [])
		},
		getSecondary: ( _, {state}) => {
			return state.secondary
		}
	},
	actions: {
	},
	mutators: {
		setMain: all => ({ all }),
	},
}

const store = createStore(setup)
export default store

