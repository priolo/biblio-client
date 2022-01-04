import { getStore, useStore } from '@priolo/jon'


export function getStoreCodeDialog() {
	return getStore("docCodeDialog")
}

export function useCodeDialog() {
	return useStore("docCodeDialog")
}
