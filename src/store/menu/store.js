/* eslint eqeqeq: "off" */
import ajax from "../../plugins/AjaxService"



const store = {
	state: {
		all: [
			{
				id: "mnu_top",
				label: "top",
				expanded: false,
			},
			{
				id: "mnu_new",
				label: "new",
				expanded: false,
			},
			{
				id: "mnu_tag",
				label: "tag",
				expanded: false,
			},
			{
				id: "mnu_users",
				label: "users",
				expanded: false,
				children: [
					{ label: "test1", expanded: false },
					{ label: "test2", expanded: false },
				]
			}
		],
		bottom: [],
	},
	getters: {
	},
	actions: {
		fetch: async (state, _, store) => {
			//const data = await ajax.get(`nodes`)
			//store.setAll(data)
		},
		fetchUsers: async (state, _, store) => {
		// 	const all = [...state.all]
		// 	const data = await ajax.get(`users`)
		// 	const nodeUsers = all.find(n => n.id == "mnu_users")
		// debugger
		// 	nodeUsers.children = data
		// 	store.setAll(all)
		},
	},
	mutators: {
		setAll: (state, all) => ({ all }),
	},
}

export default store