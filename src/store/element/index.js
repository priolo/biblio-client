import { getStore, useStore } from '@priolo/jon'

export function getStoreElement() {
	return getStore("element")
}

export function useElement() {
	return useStore("element")
}



export const ELEMENT_STATUS = {
	FULL: 0,
	ICON: 1
}

/**
 * Indica di che tipo è la visualizzazione contenuta nell'ELEMENT
 */
export const ELEMENT_TYPE = {
	AUTHORS: "authors",
	AUTHOR_DETAIL: "author-detail",
	DOC: "doc",
	LOGIN: "login",
	REGISTER: "register",
	ACTIVATE: "activate",
	MENU: "menu",
}

export const DocDefault = {
	type: ELEMENT_TYPE.DOC,
	author: "",
	date: Date.now(),
	options: {
		status: ELEMENT_STATUS.FULL,
		singletone: false,
	},
	title: "",
	body: "",
}




// export function buildElement(type, params) {
// 	const def = ElementTypeDefault[type]
// 	const options = utils.merge(params, def)
// 	return {
// 		id: params.id,
// 		type,
// 		options,
// 	}
// }

// const ElementTypeDefault = {
// 	[ELEMENT_TYPE.DOC]: {
// 		author: "",
// 		title: "",
// 		body: "",
// 	},
// 	[ELEMENT_TYPE.ACTIVATE]: {
// 	},
// }

/**
 * ELEMENT
 * E' il contenitore che viene visualizzato sul desktop
{
	id:string, // identificativo dell'ELEMENT
	type: ELEMENT_TYPE
	options: {...} // le opzioni riguardanti l'elemento visualizzato
}

DOC OPTIONS
{
	author: "",
	title: "",
	body: "",
}

 */