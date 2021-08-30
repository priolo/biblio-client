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


export function getIdentity ( type, id ) {
	const identity = `${type}${id?`_${id}`:""}`
	return identity
}
export function getTypeAndId ( identity ) {
	const [type, id] = identity.split("_")
	return { type, id }
}
