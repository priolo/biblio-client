/* eslint eqeqeq: "off" */
//import { themeLight, themeDark } from "../../theme"
//import Cookies from 'js-cookie'
import { createStore, mixStores } from "@priolo/jon"
import dialogStore from "./dialog"
import dialogVStore from "./dialogV"



const layoutSetup = {
	state: {
		busy: false,
		title: "",
		focus: "",
		//		theme: Cookies.get('theme') == "dark" ? themeDark : themeLight,
	},
	getters: {
		//		isDarkTheme: (state, payload, store) => state.theme == themeDark,
	},
	actions: {

	},
	mutators: {
		setBusy: (state, busy) => ({ busy }),
		setTitle: (state, title) => ({ title }),
		setFocus: (state, focus) => ({ focus }),
		// toggleTheme: (state) => {
		// 	Cookies.set("theme", state.theme == themeLight ? "dark" : "light" )
		// 	return {
		// 		theme: state.theme == themeLight ? themeDark : themeLight
		// 	}
		// },
		setDrawerIsOpen: (state, drawerIsOpen) => ({ drawerIsOpen }),
	},
}

const setup = mixStores(layoutSetup, dialogStore, dialogVStore)


export default createStore(setup)
