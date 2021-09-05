import { getStore, useStore } from '@priolo/jon'

export function getStoreElement() {
	return getStore("element")
}

export function useElement() {
	return useStore("element")
}



/**
 * Indica di che tipo è la visualizzazione contenuta nell'ELEMENT
 */
export const ELEMENT_TYPE = {
	AUTHORS: "aths",
	AUTHOR_DETAIL: "athDtl",
	DOC: "doc",

	LOGIN: "login",
	REGISTER: "register",
	ACTIVATE: "activate",
	MENU: "menu",
}


export function getIdentity ( type, id ) {
	const identity = `${type}${id?`_${id}`:""}`
	return identity
}
export function getTypeAndId ( identity ) {
	const [type, id] = identity.split("_")
	const level = ElementTypeLevel[type]
	return { type, id, level }
}
export const ElementTypeLevel = {
	[ELEMENT_TYPE.AUTHORS]: 1,
	[ELEMENT_TYPE.AUTHOR_DETAIL]: 2,
	[ELEMENT_TYPE.DOC]: 3,
}

