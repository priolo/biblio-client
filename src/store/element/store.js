/* eslint eqeqeq: "off" */
import { ELEMENT_TYPE } from "."
import { getStoreUrl } from "../url"

/**
 * Sono tutti gli elementi presenti
 */
const store = {
	state: {
		all: [],
		focus: null,
	},
	getters: {
		getIndexById: (state, id, store) => state.all.findIndex(doc => doc.id == id),
		getAllByType: (state, type, store) => state.all.filter(doc => doc.type == type)
	},
	actions: {
		fetch: async (state, _, store) => {
			store.setAll([
				{ 
					type: ELEMENT_TYPE.DOC, 
					id: "tmp_1",
					options: {
						title: "Questo è il titolo 1",
						author: "Ivano Iorio",
						date: "2021/04/09",
						body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sapien massa. Nulla ornare, augue sed vestibulum feugiat, mi quam tempus tortor, in hendrerit libero leo in nisl. Nam molestie mauris non nunc fermentum, eget pellentesque turpis porttitor. Pellentesque vestibulum facilisis ligula, ut pulvinar diam porttitor nec. In vulputate molestie ante at vestibulum. Pellentesque gravida eros in ligula hendrerit egestas. Etiam quis purus elementum, semper nibh sed, ultrices lacus. In ultricies rutrum suscipit. Vestibulum in sollicitudin enim. Curabitur eget imperdiet urna, eu facilisis neque. Nunc nibh sapien, congue et urna et, ullamcorper hendrerit mauris. Maecenas et sagittis mauris. Praesent quis tortor turpis. Vivamus maximus leo vel dignissim pretium. Donec tempor purus vel neque gravida, at tempus orci condimentum."
					}
				},
				{ 
					type: ELEMENT_TYPE.DOC, 
					id: "tmp_2",
					options: {
						title: "Questo è il titolo 2",
						author: "Ivano Iorio",
						date: "2021/04/09",
						body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sapien massa. Nulla ornare, augue sed vestibulum feugiat, mi quam tempus tortor, in hendrerit libero leo in nisl. Nam molestie mauris non nunc fermentum, eget pellentesque turpis porttitor. Pellentesque vestibulum facilisis ligula, ut pulvinar diam porttitor nec. In vulputate molestie ante at vestibulum. Pellentesque gravida eros in ligula hendrerit egestas. Etiam quis purus elementum, semper nibh sed, ultrices lacus. In ultricies rutrum suscipit. Vestibulum in sollicitudin enim. Curabitur eget imperdiet urna, eu facilisis neque. Nunc nibh sapien, congue et urna et, ullamcorper hendrerit mauris. Maecenas et sagittis mauris. Praesent quis tortor turpis. Vivamus maximus leo vel dignissim pretium. Donec tempor purus vel neque gravida, at tempus orci condimentum."
					}
				},
			])
		},
		// inserisce un doc in testa
		open: async (state, element, store) => {
			const { setHash } = getStoreUrl()
			//doc = utils.merge(doc, DocDefault)
			const options = element.options ?? {}

			// assigno options and id
			switch ( element.type ) {
				case ELEMENT_TYPE.ACTIVATE:
					element.id = "#activate"
				break
				case ELEMENT_TYPE.LOGIN:
					element.id = "#login"
				break
				case ELEMENT_TYPE.REGISTER:
					element.id = "#register"
				break
				case ELEMENT_TYPE.MENU:
					element.id = "#menu"
				break
				// se è un DOC allora lo prelevo/creo dal server
				case ELEMENT_TYPE.DOC:
				break
			}

			// se esiste gia' in scena allora gli do il fuoco
			const elementIndex = store.getIndexById(element.id)
			if (elementIndex != -1) {
				const elementId = state.all[elementIndex].id
				setHash(elementId)
				return
			}
			
			// lo aggiungo in testa
			const elements = [element, ...state.all]
			store.setAll(elements)
			setHash(elements.id)
		},
		// push: async (state, doc, store) => {
		// 	if (!doc.id) doc.id = "tmp_" + Math.round(999 * Math.random())
		// 	const docs = [...state.all, doc]
		// 	store.setAll(docs)
		// },
		close: async (state, id, store) => {
			const docs = state.all.filter(doc => doc.id != id)
			store.setAll(docs)
		}

	},
	mutators: {
		setAll: (state, all) => ({ all }),
		setFocus: (state, focus) => ({ focus }),
	},
}

export default store

