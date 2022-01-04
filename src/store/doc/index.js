import { getStore, useStore } from '@priolo/jon'
import { getUrlHash } from 'store/url'

export function getStoreDoc() {
	return getStore("doc")
}

export function useDoc() {
	return useStore("doc")
}

export function getStoreDocSelect() {
	// prelevo il DOC selezionato dall'URL
	const docIdSelect = getUrlHash()
	// di questo ricavo lo STORE-DOC
	const docStore = getStore(docIdSelect)
	return docStore ?? {}
}

export function useDocSelect() {
	// prelevo il DOC selezionato dall'URL
	const docIdSelect = getUrlHash()
	// di questo ricavo lo STORE-DOC
	const docStore = useStore(docIdSelect)
	return docStore ?? {}
}

export const BLOCK_TYPE = {
	PARAGRAPH: "paragraph",
	CHAPTER: "chapter",
	TEXT: "text",
	CODE: "code",
	IMAGE: "image",
}

export const FORMATS = {
	BOLD: "paragraph",
	ITALIC: "chapter",
	STRIKETHROUGH: "strikethrough",
	CODE: "code",
	LINK: "link",
}

