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




export function composeIdentity(type, id) {
	const identity = `${type}${id ? `_${id}` : ""}`
	return identity
}
export function decomposeIdentity(identity) {
	const [type, id] = identity.split("_")
	const level = ElementTypeLevel[type]
	return { type, id, level, identity }
}




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
