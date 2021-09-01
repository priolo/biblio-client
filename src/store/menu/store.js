/* eslint eqeqeq: "off" */
import { getIdentity } from "store/element"
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
	},
	getters: {
		getMain: (state, _, store) => {
			const { haveIdentity } = getStoreUrl()
			return state.main.map ( item => {
				switch ( item.name ) {
					case "authors":
						item.selected = haveIdentity( getIdentity("authors"))
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
				items.push({
					label: doc.title
				})
				return items
			}, [])
		}
	},
	actions: {
	},
	mutators: {
		setMain: (state, all) => ({ all }),
	},
}

export default store