import { getStore, useStore } from '@priolo/jon'

export function getMenu() {
	return getStore("menu")
}

export function useMenu() {
	return useStore("menu")
}


export const MAIN_MENU_ITEMS = {
	AUTHORS: "authors",
	LOGIN: "login",
	REGISTER: "register",
}