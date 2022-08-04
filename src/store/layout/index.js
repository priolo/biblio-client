/* eslint eqeqeq: "off" */
//import { themeLight, themeDark } from "../../theme"
//import Cookies from 'js-cookie'
import { createStore, mixStores } from "@priolo/jon"
import setupDialog from "./dialog"
import setupDialogV from "./dialogV"



const setupLayout = {
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
		setBusy: busy => ({ busy }),
		setTitle: title => ({ title }),
		setFocus: focus => ({ focus }),
		// toggleTheme: (state) => {
		// 	Cookies.set("theme", state.theme == themeLight ? "dark" : "light" )
		// 	return {
		// 		theme: state.theme == themeLight ? themeDark : themeLight
		// 	}
		// },
		setDrawerIsOpen: drawerIsOpen => ({ drawerIsOpen }),
	},
}

const setup = mixStores(setupLayout, setupDialog, setupDialogV)
const store = createStore(setup)
export default store
