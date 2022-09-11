import styles from "./AuthorsLayout.module.scss"

import storeAuthor from "/src/store/author"
import HeaderCmp from "../HeaderCmp"
import FinderCmp from "../FinderCmp"
import AuthorItemCard from "./AuthorItemCard"
import Actions from "/src/components/app/Actions"
import { ELEMENT_TYPE, composeIdentity, haveIdentity } from "/src/store/url/utils"
import urlStore from "/src/store/url"
import { useStore } from "@priolo/jon"


export default function AuthorsLayout({
	element
}) {

	// HOOKs

	const author = useStore(storeAuthor)
	// rendo il componente "reattivo" al cambio state di urlStore
	const urlNs = useStore(urlStore)
	const { addIdentity, toggleIdentity } = urlStore

	// HANDLE

	const handleClick = ({ author, go = false }, e) => {

		// [II]: è uguale a AuthorDetailLayout

		const identity = composeIdentity(ELEMENT_TYPE.AUTHOR_DETAIL, author.id)
		if (go) {
			e.preventDefault()
			e.stopPropagation()
			addIdentity({
				identity,
				//rightOf: element.identity,
				focus: element.identity,
			})
		} else {
			toggleIdentity({
				identity,
				//rightOf: element.identity,
			})
		}
	}

	// RENDER

	const authors = author.all
	const isSelected = (author) => haveIdentity(composeIdentity(ELEMENT_TYPE.AUTHOR_DETAIL, author.id))

	return (
		<div className={styles.container} >
			<HeaderCmp
				title="JON Documentation"
				subtitle="Priolo22"
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
					{ label: "close other" },
				]}
			/>
			<div className={styles.list} >
				{authors.map(author => (
					<AuthorItemCard key={author.id}
						className={styles.card}
						author={author}
						selected={isSelected(author)}
						onClick={handleClick}
					/>
				))}
			</div>
		</div>
	)
}
