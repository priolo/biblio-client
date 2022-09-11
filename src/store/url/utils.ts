/**
* Gestisce l'URL del BROWSER in relazione alle IDENTITY presenti nell'APP
* @typedef {Object} StoreUrl
* @property {StateUrl} state

* GETTERS
* @property {()=>Identity[]} getElements 
* Restituisce tutte le IDENTITY degli ELEMENT presenti nell'URL

* ACTIONS
* @property {( options:pAddIdentity ) => void} addIdentity
* Aggiunge un ELEMENT alla collezione di documenti visualizzati
* @property {( identity:string ) => void} removeIdentity
* Elimina un elemento gia' presente tra i doc visualizzati
* @property {( options:pAddIdentity ) => void} toggleIdentity
* Molto semplice: se c'e' gia' un ELEMENT lo cancello altrimenti lo creo
* @property {( options:{name:string, value:string} ) => void} setParam
* Setta un parametro nell'URL
* @property {( options:{name:string, value:string[]} ) => void} setArray
* Setta un parametro nell'URL di tipo ARRAY
* @property {( hash:string ) => void} setHash
* imposta un valore nell'HASH dell'URL
* @property {( options:{ search:string, hash:string } ) => void} composeUrl
* imposta nell'URL la parte SEARCH e la parte HASH (con interazione REACT)

* MUTATORS
* @property {( url:string ) => void} setUrl
* setta l'url (intero)

* STATE DEF
* @typedef {Object} StateUrl
* @property {string} url - la stringa presente nel browser

* PARAMS
* @typedef {{identity:string, by:string, rigthOf:string, focus:boolean}} pAddIdentity
* indica l'aggiunta di un IDENTITY. il nome, la posizione, la posizione della destra e se bisogna settare il focus
*/

/**
 * Indica l'IDENTITY di un ELEMENT
 * @typedef { object } Identity
 * @property {ELEMENT_TYPE} type	il TYPE di questo element
 * @property {string} id
 * @property {ElementTypeLevel} level
 * @property {string} identity	una stringa rappresentativa dell'IDENTITY
 */
interface Element {
	type:ELEMENT_TYPE,
	id:string,
	level:number,
	identity:string,
}

/**
 * @constant {string} DIV_PROP per un PARAM di tipo ARRAY è il carattere divisorio tra gli items
 */
export const DIV_PROP = "-"
const DIV_SUB = "."

/**
 * Indica di che tipo è la visualizzazione contenuta nell'ELEMENT
 */
export enum ELEMENT_TYPE {
	AUTHORS = "aths",
	AUTHOR_DETAIL = "athDtl",
	DOC = "doc",

	LOGIN = "login",
	REGISTER = "register",
	ACTIVATE = "activate",
	MENU = "menu",
}
/**
 * Indica il LEVEL dell'ELEMENT.
 * Mi serve per dare un ordine gerarchico
 * @readonly @enum {number}
 */
export const ElementTypeLevel = {
	[ELEMENT_TYPE.AUTHORS]: 1,
	[ELEMENT_TYPE.AUTHOR_DETAIL]: 2,
	[ELEMENT_TYPE.DOC]: 3,
}

/**
 * compone un IDENTITY-STRING
 * @param {ELEMENT_TYPE} type tipo di ELEMENT
 * @param {string} id identificativo dell'ELEMENT
 * @returns {string}
 */
export function composeIdentity(type, id) {
	const identity = `${type}${id ? `_${id}` : ""}`
	return identity
}

/**
 * decompone un IDENTITY-STRING
 * @param {string} identity 
 * @returns {Identity}
 */
export function decomposeIdentity(identity) {
	const [type, id] = identity.split("_")
	const level = ElementTypeLevel[type]
	return { type, id, level, identity }
}

/**
 * Restituisce l'url di un ELEMENT tramite la sua IDENTITY-STRING
 * @param {string} identity 
 * @returns {string}
 */
export function getUrlByIdentity(identity) {
	return `${window.location.origin}/app?i=${identity}`
}

/**
 * Restituisce il valore di una prop nell URL
 * inserita nella "query" dell'url
 * @param {string} name 
 * @returns {string}
 */
export function getUrlValue(name) {
	const searchParams = new URLSearchParams(window.location.search)
	return searchParams.get(name)
}
// TODO
export function setUrlValue(name, value) {
}

/**
 * restituisce il valore ARRAY di una PROP-URL
 * @param {string} name nome della PROP-URL 
 * @returns {string[]} valore array della PROP-URL
 */
export function getUrlValueArray(name) {
	const value = getUrlValue(name)
	return value ? value.split(DIV_PROP) : []
}
// TODO
export function setUrlValueArray(name, value) {
}

/**
 * Semplicemente l'HASH dell'URL (senza #)
 * @returns {string}
 */
export function getUrlHash() {
	const hash = window.location.hash
	return hash.slice(1)
}

/**
 * Tutte le "identity" degli ELEMENT visualizzati
 * @returns {string[]}
 */
export function getUrlIdentities() {
	return getUrlValueArray("i")
}

/**
 * Se nellì'URL c'e' una IDENTITY o no
 * @param {string} identity 
 * @returns {boolean}
 */
export function haveIdentity(identity) {
	const identities = getUrlIdentities()
	return identities.includes(identity)
}

/**
 * Posizione di una IDENTITY nella lista
 * @param {string} identity 
 * @returns {number} indice posizione
 */
export function indexIdentity(identity) {
	const identities = getUrlIdentities()
	return identities.indexOf(identity)
}


