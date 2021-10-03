import { getStore, useStore } from '@priolo/jon'


export function getStoreEditorDialog() {
	return getStore("editorDialog")
}

export function useEditorDialog() {
	return useStore("editorDialog")
}

export const CONTENT_TYPE = {
	NOTHING: 1,
	
}