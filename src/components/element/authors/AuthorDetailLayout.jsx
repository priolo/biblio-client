import styles from "./AuthorDetailLayout.module.scss"

import HeaderCmp from "../HeaderCmp"
import FinderCmp from "../FinderCmp"
import Actions from "/src/components/app/Actions"
import DocItem from "./DocItem"
import { composeIdentity, haveIdentity } from "/src/store/url/utils"
import urlStore from "/src/store/url"
import { useEffect } from "react"
import {getElementStore} from "/src/store/doc"
import { useStore } from "@priolo/jon"


export default function AuthorDetailLayout({
	element,
}) {

	// HOOKs

	const store = getElementStore(element.identity)
	const author = useStore(store)
	// rendo il componente "reattivo" al cambio state di urlStore
	const urlNs = useStore(urlStore)
	const { toggleIdentity, addIdentity } = urlStore

	useEffect(() => {
		store.fetch()
	}, [])

	// HANDLE

	const handleClick = ({ doc, go = false }, e) => {

		// [II]: è uguale a AuthorsLayout

		const identity = composeIdentity("doc", doc.id)
		if (go) {
			e.preventDefault()
			e.stopPropagation()
			addIdentity({
				identity,
				//rightOf: element.identity,
				focus: true,
			})
		} else {
			toggleIdentity({
				identity,
				//rightOf: element.identity,
			})
		}
	}

	// RENDER
	if ( !author ) return null
	const docs = author.docs ?? []
	const isSelected = (doc) => haveIdentity(composeIdentity("doc", doc.id))

	return (
		<div className={styles.container} >
			<HeaderCmp
				title={author.name}
				subtitle="Tutti i contributi dell'utente..."
				date="14/08/75"
				element={element}
			/>
			<FinderCmp
				element={element}
			/>
			<Actions
				className={styles.actions}
				actions={[
					{ label: "deselect", disabled: true },
					{ label: "message", disabled: true },
					{ label: "like" },
				]}
			/>
			<div className={styles.list}>
				{docs.map(doc => (
					<DocItem key={doc.id}
						className={styles.doc}
						doc={doc}
						selected={isSelected(doc)}
						onClick={handleClick}
					/>
				))}
			</div>
		</div>
	)
}