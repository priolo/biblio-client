import { getStore, useStore } from '@priolo/jon'

export function getStoreAuthor() {
	return getStore("author")
}

export function useAuthor() {
	return useStore("author")
}