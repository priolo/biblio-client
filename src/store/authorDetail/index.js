import { getStore, useStore } from '@priolo/jon'

export function getStoreAuthorDetail() {
	return getStore("authorDetail")
}

export function useAuthorDetail() {
	return useStore("authorDetail")
}