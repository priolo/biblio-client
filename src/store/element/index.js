import { getStore, useStore } from '@priolo/jon'

export function getStoreElement() {
	return getStore("element")
}

export function useElement() {
	return useStore("element")
}


