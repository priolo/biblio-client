/* eslint eqeqeq: "off" */
import { getStoreLayout } from "../store/layout"
import i18n from "i18next"
import { getStoreAuth } from "../store/auth"
import { DIALOG_TYPES } from "../store/layout/dialog"


const optionsDefault = {
	baseUrl: "/api/"
}

const optionsDefaultSend = {
	noBusy: false,
	noDialog: false,
}

export class AjaxService {
	constructor(options = optionsDefault) {
		this.options = { ...optionsDefault, ...options }
	}

	async post(url, data, options) {
		return await this.send(url, "POST", data, options);
	}
	async get(url, data, options) {
		return await this.send(url, "GET", data, options);
	}
	async patch(url, data, options) {
		return await this.send(url, "PATCH", data, options);
	}
	async put(url, data, options) {
		return await this.send(url, "PUT", data, options);
	}
	async delete(url, data, options) {
		return await this.send(url, "DELETE", data, options);
	}

	/**
	 * Send a ajax to server
	 * @param {*} url 
	 * @param {*} method 
	 * @param {*} data 
	 * @param {*} options
	 * @param {boolean} options.noBusy (true) no show busy indictor
	 */
	async send(url, method, data, options = {}) {
		const { setBusy, dialogOpen, setFocus } = getStoreLayout()
		const { state: auth } = getStoreAuth()
		options = { ...optionsDefaultSend, ...options }

		if (!options.noBusy) setBusy(true)
		const token = auth.token

		// send request
		const response = await fetch(
			`${this.options.baseUrl}${url}`,
			{
				method: method,
				headers: {
					"Content-Type": "application/json",
					...token && { "Authorization": `Bearer ${token}` }
				},
				body: data ? JSON.stringify(data) : undefined,
			}
		)
		if (!options.noBusy) setBusy(false)

		const status = response.status
		const dataJson = await response.json()

		// error
		if (status >= 400) {
			if (!options.noDialog) {
				const i18nMsg = {
					type: DIALOG_TYPES.ERROR,
					title: i18n.t(getI18nPathForError(status, url, error.code, "title")),
					text: i18n.t(getI18nPathForError(status, url, error.code, "text")),
					labelOk: i18n.t(getI18nPathForError(status, url, error.code, "ok")),
				}
				dialogOpen( i18nMsg )
			}
			throw response;
		}

		return dataJson
	}
}

/**
 * find correct text in i18n json 
 * @param {*} status 
 * @param {*} url 
 * @param {*} code 
 * @param {*} prop 
 */
function getI18nPathForError(status, url, code, prop) {
	let i
	const context = url.slice(0, (i = url.indexOf("/")) != -1 ? i : undefined)
	return [
		`dialog.error.${context}.${code}.${prop}`,
		`dialog.error.${context}.default.${prop}`,
		`dialog.error.${status}.${code}.${prop}`,
		`dialog.error.${status}.default.${prop}`,
		`dialog.error.default.${prop}`
	]
}

export default new AjaxService()