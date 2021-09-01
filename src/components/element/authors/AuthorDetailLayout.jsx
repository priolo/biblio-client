import styles from "./AuthorDetailLayout.module.scss"

import HeaderCmp from "../HeaderCmp"
import FinderCmp from "../FinderCmp"
import Actions from "components/app/Actions"
import DocItem from "./DocItem"
import { useStore } from "@priolo/jon"
import { getIdentity, useElement } from "store/element"
import { useUrl } from "store/url"


export default function AuthorDetailLayout({
	element
}) {

	// HOOKs

	const { state: author } = useStore(element.identity)
	const { haveIdentity, toggleIdentity } = useUrl()

	// HANDLE

	const handleClick = doc => {
		toggleIdentity({
			identity: getIdentity("doc", doc.id),
			rightOf: element.identity
		})
	}

	// RENDER

	const docs = author.docs
	const isSelected = (doc) => haveIdentity(getIdentity("doc", doc.id))

	return (
		<div className={styles.container} >
			<HeaderCmp
				title={author.name}
				subtitle="Priolo22"
				date="14/08/75"
				identity={element.identity}
			/>
			<FinderCmp />
			<Actions
				className={styles.actions}
				actions={[
					{ label: "delete", disabled: true },
					{ label: "modify", disabled: true },
					{ label: "view" },
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