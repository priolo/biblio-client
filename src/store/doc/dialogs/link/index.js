import { getStore, useStore } from '@priolo/jon'


export function getStoreLinkPopUp() {
	return getStore("docLinkPopUp")
}

export function useLinkPopUp() {
	return useStore("docLinkPopUp")
}
