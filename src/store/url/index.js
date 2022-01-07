import { getStore, useStore } from "@priolo/jon"



export function getStoreUrl() {
	return getStore("url")
}

export function useUrl() {
	return useStore("url")
}

const DIV_PROP = "-"
const DIV_SUB = "."

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
export const ElementTypeLevel = {
	[ELEMENT_TYPE.AUTHORS]: 1,
	[ELEMENT_TYPE.AUTHOR_DETAIL]: 2,
	[ELEMENT_TYPE.DOC]: 3,
}



/**
 * compone un IDENTITY
 * @param {ELEMENT_TYPE} type 
 * @param {string} id 
 * @returns string
 */
export function composeIdentity(type, id) {
	const identity = `${type}${id ? `_${id}` : ""}`
	return identity
}

/**
 * decompone un identity
 * @param {string} identity 
 * @returns object
 */
export function decomposeIdentity(identity) {
	const [type, id] = identity.split("_")
	const level = ElementTypeLevel[type]
	return { type, id, level, identity }
}

/**
 * Restituisce l'url di un ELEMENT tramite la sua "identity"
 */
 export function getUrlByIdentity ( identity ) {
	return `${window.location.origin}/app?i=${identity}`
}

/**
 * Restituisce il valore di una proprietà
 * inserita nella "query" dell'url
 * @param {string} name 
 * @returns string
 */
export function getUrlValue(name) {
	const searchParams = new URLSearchParams(window.location.search)
	return searchParams.get(name)
}
// TODO
export function setUrlValue(name, value) {
}


export function getUrlValueArray(name) {
	const value = getUrlValue(name)
	return value ? value.split(DIV_PROP) : []
}
// TODO
export function setUrlValueArray(name, value) {
}

export function getUrlHash() {
	const hash = window.location.hash
	return hash.slice(1)
}


export function getIdentities() {
	return getUrlValueArray("i")
}
export function haveIdentity(identity) {
	const identities = getIdentities()
	return identities.includes(identity)
}
export function indexIdentity(identity) {
	const identities = getIdentities()
	return identities.indexOf(identity)
}


