import { getStore, useStore } from '@priolo/jon'


export function getStoreTypeDialog() {
	return getStore("docTypeDialog")
}

export function useTypeDialog() {
	return useStore("docTypeDialog")
}
