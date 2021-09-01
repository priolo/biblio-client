import { useCallback, useEffect, useRef } from "react"

import DocLayout from "./doc/DocLayout"
import AuthorsLayout from "./authors/AuthorsLayout"
import AuthorDetailLayout from "./authors/AuthorDetailLayout"

import { MultiStoreProvider } from "@priolo/jon"
import { useUrl } from "../../store/url"
import docSetup from "../../store/doc/store"
import authorDetailSetup from "../../store/authorDetail/store"


export default function PolyLayout({
	element
}) {

	// HOOKs

	const { state: url, setHash, getHash } = useUrl()
	const contentRef = useRef(null)

	useEffect(() => {
		if (getHash() != element.identity) return
		contentRef.current?.scrollIntoView({ behavior: "smooth", /*block: "center",*/ inline: "center" })
	}, [url.url])

	// HANDLEs

	const handleClickContent = e => { setHash(element.identity) }

	// RENDER

	const builElement = useCallback(() => {
		switch (element.type) {
			case "authors":
				return <AuthorsLayout />
			case "list":
				return <MultiStoreProvider setups={{ [element.identity]: { ...authorDetailSetup } }}>
					<AuthorDetailLayout element={element} />
				</MultiStoreProvider>
			case "doc":
				return <MultiStoreProvider setups={{ [element.identity]: { ...docSetup } }}>
					<DocLayout element={element} />
				</MultiStoreProvider>
			default:
				return null

		}
		// <MenuLayout content={element} />,
		// <LoginLayout content={element} />,
		// <RegisterLayout content={element} />,
		// <ActivateLayout content={element} />,
	}, [element.identity])

	return <div onClick={handleClickContent} ref={contentRef}>
		{builElement()}
	</div>

}

