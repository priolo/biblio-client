import { Node } from 'slate'
import { ELEMENT_TYPE } from '/src/store/url/utils'


/**
* Gestisce un singolo DOC-SLATE READONLY/EDITABLE 
* @typedef {Object} StoreDoc

* STATE
* @property {StateDoc} state

* GETTERS
* @property {()=>string} getIdentity 
* Restituisce l'IDENTITY-STRING dell'ELEMENT che contiene questo DOC
* @property {()=>boolean} isSelect 
* se questo DOCUMENT è quello attualmente SELECTED (in hash)

* ACTIONS
* @property {()=>void} fetch
* Recupera il JSON di un documento tramite la sua IDENTITY
* Il primo posto dove lo cerca è LOCAL-STORAGE
* @property {()=>void} save
* memorizza lo stato di questo documento
* @property {()=>void} onClose
* [event] chiamato quando il DOC viene chiuso]

* MUTATORS
* @property {(editor:any)=>void} setEditor
* l'oggetto EDITOR di SLATE

* @typedef {Object} StateDoc
* @property {string} id identificativo del documento inserito in Polylayout.jsx
* @property {ELEMENT_TYPE} type 
* @property {string} author "Priolo22",
* @property {string} title "Questo testo è statico",
* @property {string} subtitle "Mbeh se è per questo anche questo lo è!",
* @property {string} date "14/08/1975" [II] metterlo numerico
* @property {any} editor SLATE editor  
* https://docs.slatejs.org/concepts/07-editor
*/

/**
 * @returns {StoreDoc}
 */
// export function getStoreDoc() {
// 	return getStore("doc")
// }

/**
 * @returns {StoreDoc}
 */
// export function useDoc() {
// 	return useStore("doc")
// }

/**
 * In base all'url, 
 * restituisco il doc-store selezionata
 */
// export function getStoreDocSelect() {
// 	// prelevo il DOC selezionato dall'URL
// 	const docIdSelect = getUrlHash()
// 	// di questo ricavo lo STORE-DOC
// 	const docStore = getStore(docIdSelect)
// 	return docStore ?? {}
// }

/**
 * In base all'url, 
 * restituisco il doc-store selezionata
 */
// export function useDocSelect() {
// 	// prelevo il DOC selezionato dall'URL
// 	const docIdSelect = getUrlHash()
// 	// di questo ricavo lo STORE-DOC
// 	const docStore = useStore(docIdSelect)
// 	return docStore ?? {}
// }

/**
 * tipi di BLOCK nel documento
 * @readonly @enum {string}
 */
export const BLOCK_TYPE = {
	PARAGRAPH: "paragraph",
	CHAPTER: "chapter",
	TEXT: "text",
	CODE: "code",
	IMAGE: "image",
}

/**
 * Tipi di FORMAT del testo
 * @readonly @enum {string}
 */
export const FORMATS = {
	BOLD: "bold",
	ITALIC: "italic",
	STRIKETHROUGH: "strikethrough",
	CODE: "code",
	LINK: "link",
}

/**
 * Restituisce una string di tutto il testo contenuto in un ELEMENT
 * @param {Element} element 
 * @returns {string}
 */
export function getTextFromElement(element) {
	const text = [...Node.texts(element)].map(t => t[0].text).join("\n")
	return text
}

