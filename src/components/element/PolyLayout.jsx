import DocLayout from "./doc/DocLayout"
import MenuLayout from "../layouts/MenuLayout"
import LoginLayout from "./account/LoginLayout"
import RegisterLayout from "./account/RegisterLayout"
import ActivateLayout from "./account/ActivateLayout"
import { useUrl } from "../../store/url"
import { ELEMENT_TYPE } from "../../store/element"
import { useEffect, useRef } from "react"

import { MultiStoreProvider } from "@priolo/jon"
import docSetup from "../../store/doc/store"
import AuthorsLayout from "./authors/AuthorsLayout"
import AuthorDetailLayout from "./authors/AuthorDetailLayout"


function PolyLayout({
	content
}) {

	// HOOKs
	const { state: url, setHash, getHash } = useUrl()
	const contentRef = useRef(null)
	useEffect(() => {
		if (getHash() != content.id) return
		contentRef.current?.scrollIntoView({ behavior: "smooth", /*block: "center",*/ inline: "center" })
	}, [url.url])

	// HANDLEs
	const handleClickContent = e => setHash(content.id)

	// RENDER
	const setup = {...docSetup}
	
	const contents = {
		[ELEMENT_TYPE.AUTHORS]: <AuthorsLayout />,
		[ELEMENT_TYPE.AUTHOR_DETAIL]: <AuthorDetailLayout />,
		[ELEMENT_TYPE.DOC]: (<MultiStoreProvider setups={{[`doc_${content.id}`]:setup}}>
			<DocLayout id={content.id} />
		</MultiStoreProvider>),
		[ELEMENT_TYPE.MENU]: <MenuLayout content={content} />,
		[ELEMENT_TYPE.LOGIN]: <LoginLayout content={content} />,
		[ELEMENT_TYPE.REGISTER]: <RegisterLayout content={content} />,
		[ELEMENT_TYPE.ACTIVATE]: <ActivateLayout content={content} />,
	}

	return <div onClick={handleClickContent} ref={contentRef}>
		{contents[content.type]}
	</div>

}

export default PolyLayout