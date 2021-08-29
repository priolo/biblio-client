/* eslint eqeqeq: "off" */
import ajax from "../../plugins/AjaxService"



const store = {
	state: {
		all: [
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
		bottom: [],
	},
	getters: {
	},
	actions: {
		select: ( state, id, store ) => {
			
		},
	},
	mutators: {
		setAll: (state, all) => ({ all }),
	},
}

export default store