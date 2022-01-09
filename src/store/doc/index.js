import { getStore, useStore } from '@priolo/jon'
import { Node } from 'slate'
//import { getUrlHash } from 'store/url'





export function getStoreDoc() {
	return getStore("doc")
}

export function useDoc() {
	return useStore("doc")
}

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
 */
export const BLOCK_TYPE = {
	PARAGRAPH: "paragraph",
	CHAPTER: "chapter",
	TEXT: "text",
	CODE: "code",
	IMAGE: "image",
}

/**
 * Tipi di formati del testo
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

