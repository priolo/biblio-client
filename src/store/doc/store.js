/* eslint eqeqeq: "off" */
import docs from "./docs.mock"

const store = {
	state: {
		author: "",
		title: "",
		subtitle: "",
		date: "",
		blocks: [
			{
				type: "chapter",
				data: "Quik start"
			},
			{
				type: "paragraph",
				data: "installation"
			},
			{
				type: "text",
				data: "Istallare la libreria con il classico npm digitare:"
			},
			{
				type: "code-line",
				data: "npm install @priolo/jon"
			},
			{
				type: "paragraph",
				data: "Create STORE"
			},
			{
				type: "text",
				data: "Una volta istallata la libreria JON è possibile utilizzarla con l’import <b>ES6<b>.<br/>Prima di tutto bisogna creare il SETUP dello STORE. Questo contiene:"
			},
			{
				type: "list",
				data: [
					"lo stato iniziale",
					"i getters",
					"i mutators",
					"le actions",
				]
			},
			{
				type: "text",
				data: "che però verdemo in seguito. Per il momento.<br/>Dentro un file js scrivere:"
			},
		],
	},
	getters: {
	},
	actions: {
		fetch: (state, _, store) => {
			const doc = docs.find(doc => doc.id == state.id)
			const newState = { ...state, ...doc }
			store._update(newState)
		}
	},
	mutators: {
	},
}

export default store