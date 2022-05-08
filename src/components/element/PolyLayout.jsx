import styles from "./PolyLayout.module.scss"
import { CSSTransition } from "react-transition-group"

import { useCallback, useEffect, useRef } from "react"

import DocLayout from "./doc/DocLayout"
import AuthorsLayout from "./authors/AuthorsLayout"
import AuthorDetailLayout from "./authors/AuthorDetailLayout"

import { MultiStoreProvider } from "@priolo/jon"
import docSetup from "../../store/doc/store"
import authorDetailSetup from "../../store/authorDetail/store"
import { useUrl, ELEMENT_TYPE, getUrlHash } from "store/url"
import LoginLayout from "./account/LoginLayout"


/**
 * @typedef {object} Param
 * @property {import("store/url").Identity} element l'ELEMENT che deve essere visualizzato
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
	const { state: url, setHash } = useUrl()
	const contentRef = useRef(null)

	useEffect(() => {
		if (element && getUrlHash() != element.identity) return
		contentRef.current?.focus()
		contentRef.current?.scrollIntoView({ behavior: "smooth", /*block: "center",*/ inline: "center" })
	}, [url.url])


	// HANDLEs
	const handleClickContent = e => { setHash(element.identity) }


	// RENDER
	// costruisce il componente per l'ELEMENT
	// notare che è dentro un useCallback quindi la costruzione viene chiamata solo quando l'"identity" cambia
	const builElement = useCallback(() => {
		switch (element.type) {
			case ELEMENT_TYPE.AUTHORS:
				return <AuthorsLayout
					element={element}
				/>
			case ELEMENT_TYPE.AUTHOR_DETAIL: {
				const setup = { ...authorDetailSetup }
				setup.state = { ...setup.state, id: element.id }
				return <MultiStoreProvider setups={{ [element.identity]: setup }}>
					<AuthorDetailLayout
						element={element}
					/>
				</MultiStoreProvider>
			}
			case ELEMENT_TYPE.DOC: {
				const setup = { ...docSetup }
				setup.state = { ...setup.state, id: element.id }
				return <MultiStoreProvider setups={{ [element.identity]: { ...setup } }}>
					<DocLayout
						element={element}
					/>
				</MultiStoreProvider>
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
			{builElement()}
		</div>
	)
}

