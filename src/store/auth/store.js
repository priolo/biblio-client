/* eslint eqeqeq: "off" */
import ajax from "../../plugins/AjaxService";
import Cookies from 'js-cookie'
import i18n from "i18next";
import { getStoreNode } from "../node";
import { DOC_TYPE, getStoreDoc } from "../doc";
import { getStoreLayout } from "../layout";
import { DIALOG_TYPES } from "../layout/dialog";

let idPolling = null

const store = {
	state: {
		user: null, //{ id:<???>, username:<string>, has_to_change_password:<bool>, role:<???> }
		token: Cookies.get('token'),

		email: "",
		password: "",
		activationToken: "",
	},
	getters: {
		isLogged: state => state.token != null && state.user != null,
		// isRepassword: state => {
		// 	return state.user != null && state.user.has_to_change_password == true
		// },
	},
	actions: {

		register: async (state, _, store) => {
			const { open } = getStoreDoc()
			const { dialogOpen } = getStoreLayout()

			const data = {
				email: state.email,
			}
			await ajax.post("auth/register", data)

			dialogOpen({ type: "success", text: "check email", modal: false })
			open({ type: DOC_TYPE.ACTIVATE, options: { singletone: true } })
		},

		activate: async (state, _, store) => {
			const { dialogOpen } = getStoreLayout()
			const { open } = getStoreDoc()

			const data = {
				code: state.activationToken,
				password: state.password,
			}

			try {
				await ajax.post("auth/activate", data, { noDialog:true })
			} catch ( response ) {
				dialogOpen({ type: DIALOG_TYPES.ERROR, text: "Il codice non è corretto!\n ti dovrebbe essere arrivato per email.\nControlla oppure registrati nuovamente" })	
				return
			}

			dialogOpen({ type: "success", text: "attivato!!!", modal: false })
			open({ type: DOC_TYPE.LOGIN, options: { singletone: true } })
		},

		login: async (state, _, store) => {
			const { dialogOpen } = getStoreLayout()
			const data = {
				email: state.email,
				password: state.password,
			}
			try {
				await ajax.post("auth/login", data);
			} catch (error) {
				dialogOpen({ type: "error", text: "no no no!!!", modal: false })
				//store.logout()
				return;
			}

			dialogOpen({ type: "success", text: "login!!!", modal: false })
			
			await store.fetchCurrentUser()
		},

		// refresh: async (state, payload, store) => {
		// 	if (state.token == null) return
		// 	await store.fetchCurrentUser()
		// },
	
		// changePassword: async (state, payload, store) => {
		// 	const { dialogOpen } = getStoreLayout()
		// 	const data = {
		// 		old_password: state.oldpassword,
		// 		new_password: state.repassword,
		// 	}
		// 	store.resetTexts()

		// 	try {
		// 		await ajax.patch(`users/${state.user.id}/password`, data);
		// 	} catch (e) {
		// 		return { error: true }
		// 	}

		// 	dialogOpen({
		// 		type: "success",
		// 		text: i18n.t("pag.password.msg_success"),
		// 		modal: false,
		// 	})
		// 	store.setUser({ ...state.user, has_to_change_password: false })
		// 	return { error: false }
		// },

		fetchCurrentUser: async (state, payload, store) => {
			try {
				const response = await ajax.get("user/me")
				store.setUser(response)
			} catch (error) {
				store.logout()
			}
			//const { fetchRoot } = getStoreNode()
			//await fetchRoot()
		},

		// refreshToken: async (state, payload, store) => {
		// 	try {
		// 		const response = await ajax.get("auth/refresh", null, { noBusy: true });
		// 		store.setToken(response.access_token)
		// 	} catch (error) {
		// 		store.logout()
		// 	}
		// },

		// startPollingRefreshToken: (state, payload, store) => {
		// 	if (idPolling != null) return;
		// 	const delay = process.env.REACT_APP_TOKEN_POLLING_TIME != null ? +process.env.REACT_APP_TOKEN_POLLING_TIME : 720000
		// 	idPolling = setInterval(() => {
		// 		store.refreshToken()
		// 	}, delay)
		// },

		// stopPollingRefreshToken: (state, payload, store) => {
		// 	if (idPolling == null) return;
		// 	clearInterval(idPolling)
		// 	idPolling = null
		// },

		logout: (state, { flash } = { flash: false }, store) => {
			const { dialogOpen } = getStoreLayout()
			//store.stopPollingRefreshToken()
			//store.setToken(null)
			store.setUser(null)
			if (flash) dialogOpen({ type: "success", text: i18n.t("app.auth.msg_logout"), modal: false })
		},
	},
	mutators: {
		// [II] deve essere il layout che pesca lo user e adatta la lista non il contrario
		setUser: (state, user, store) => ({ user }),

		setToken: (state, token, store) => {
			if (token == null) {
				Cookies.remove('token');
			} else {
				Cookies.set('token', token) //, { expires: remember ? 365 : null });
			}
			return { token }
		},

		setEmail: (state, email) => ({ email }),
		setPassword: (state, password) => ({ password }),
		setActivationToken: (state, activationToken) => ({ activationToken }),
	},
}

export default store