import { getStore, useStore } from '@priolo/jon'

export function getStoreDoc() {
	return getStore("doc")
}

export function useDoc() {
	return useStore("doc")
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