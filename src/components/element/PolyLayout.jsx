import styles from "./PolyLayout.module.scss"
import { CSSTransition } from "react-transition-group"

import { createElement, useCallback, useEffect, useMemo, useRef } from "react"

import DocLayout from "./doc/DocLayout"
import AuthorsLayout from "./authors/AuthorsLayout"
import AuthorDetailLayout from "./authors/AuthorDetailLayout"

import {createDocStore} from "../../store/doc"
import { ELEMENT_TYPE, getUrlHash } from "store/url/utils"
import urlStore from "store/url"
import LoginLayout from "./account/LoginLayout"
import {useStore} from "@priolo/jon"
import {createAuthorDetailStore} from "store/authorDetail"



/**
 * @typedef {object} Param
 * @property {import("store/url/utils").Identity} element l'ELEMENT che deve essere visualizzato
 */

/**
 * Il un ELEMENT che permette di visualizzare qualsiasi altro tipo di ELEMENT
 * E' un contenitore che visualizza qualsiasi documento nell'area orizzontale
 * @param {Param} param0 
 */
export default function PolyLayout({
	element,
	className
}) {

	// HOOKs
	const urlNs = useStore(urlStore)
	const { setHash } = urlStore
	const contentRef = useRef(null)

	// se cambia l'url allora forse è cambiata la selezione
	useEffect(() => {
		if (element && getUrlHash() != element.identity) return
		contentRef.current?.focus()
		contentRef.current?.scrollIntoView({ behavior: "smooth", /*block: "center",*/ inline: "center" })
	}, [urlNs.url])


	// HANDLEs
	const handleClickContent = e => { setHash(element.identity) }


	// RENDER
	// costruisce il componente per l'ELEMENT
	// notare che è dentro un useMemo quindi la costruzione viene chiamata solo quando l'"identity" cambia
	const builElement = useMemo(() => {
		switch (element.type) {
			case ELEMENT_TYPE.AUTHORS:
				return <AuthorsLayout element={element} />

			case ELEMENT_TYPE.AUTHOR_DETAIL: {
				createAuthorDetailStore( element.identity )
				return <AuthorDetailLayout element={element} />
			}

			case ELEMENT_TYPE.DOC: {
				createDocStore( element.identity )
				return <DocLayout element={element} />
			}

			case ELEMENT_TYPE.LOGIN: {
				return <LoginLayout element={element} />
			}

			default:
				return null
		}
		// <MenuLayout content={element} />,
		// <LoginLayout content={element} />,
		// <RegisterLayout content={element} />,
		// <ActivateLayout content={element} />,
	}, [element.identity])

	return (
		<div className={styles.root}
			onClick={handleClickContent}
			ref={contentRef}
			tabIndex="0"
			id={element.identity}
		>
			{builElement}
		</div>
	)
}

