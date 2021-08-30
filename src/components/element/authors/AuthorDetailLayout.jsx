import styles from "./AuthorDetailLayout.module.scss"

import HeaderCmp from "../HeaderCmp"
import FinderCmp from "../FinderCmp"
import Actions from "components/app/Actions"
import DocItem from "./DocItem"
import { useStore } from "@priolo/jon"
import { useElement } from "store/element"


export default function AuthorDetailLayout({
	element
}) {

	// HOOKs

	const { state:author, isSelected, toggleSelected } = useStore(element.identity)
	const { open } = useElement()

	// HANDLE
	
	const handleClick = doc => {
		toggleSelected(doc.id)
	}
	const handleDoubleClick = doc => {
		open ( getIdentity ( "doc", doc.id) )
	}

	// RENDER

	const docs = author.docs

	return (
		<div className={styles.container} > 
			<HeaderCmp
				title = {author.name}
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
				{docs.map ( doc => (
					<DocItem key={doc.id}
						className={styles.doc} 
						doc={doc}
						selected={isSelected(doc.id)}
						onClick={handleClick}
						onDoubleClick={handleDoubleClick}
					/>
				))}
			</div> 
		</div>
	)
}
