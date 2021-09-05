import styles from "./AuthorDetailLayout.module.scss"

import HeaderCmp from "../HeaderCmp"
import FinderCmp from "../FinderCmp"
import Actions from "components/app/Actions"
import DocItem from "./DocItem"
import { useStore } from "@priolo/jon"
import { getIdentity, useElement } from "store/element"
import { useUrl } from "store/url"
import { useEffect } from "react"


export default function AuthorDetailLayout({
	element,
}) {

	// HOOKs

	const { state: author, fetch } = useStore(element.identity)
	const { haveIdentity, toggleIdentity, setHash, addIdentity } = useUrl()

	useEffect(() => {
		fetch()
	}, [])

	// HANDLE

	const handleClick = ({ doc, go = false }, e) => {


		// [II]: è uguale a AuthorsLayout

		const identity = getIdentity("doc", doc.id)
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

	const docs = author.docs
	const isSelected = (doc) => haveIdentity(getIdentity("doc", doc.id))

	return (
		<div className={styles.container} >
			<HeaderCmp
				title={author.name}
				subtitle="Tutti i contributi dell'utente..."
				date="14/08/75"
				identity={element.identity}
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