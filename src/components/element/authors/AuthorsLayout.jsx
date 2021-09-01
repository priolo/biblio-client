import styles from "./AuthorsLayout.module.scss"

import { getStoreAuthor } from "store/author"
import HeaderCmp from "../HeaderCmp"
import FinderCmp from "../FinderCmp"
import AuthorItemCard from "./AuthorItemCard"
import Actions from "components/app/Actions"
import { getIdentity } from "store/element"
import { useUrl } from "store/url"


export default function AuthorsLayout() {

	// HOOKs

	const { state: authorStore } = getStoreAuthor()
	const { haveIdentity, toggleIdentity } = useUrl()

	// HANDLE

	const handleClick = author => {
		toggleIdentity({
			identity: getIdentity("list", author.id),
			rightOf: getIdentity("authors"),
		})
	}

	// RENDER

	const identity = "authors"
	const authors = authorStore.all
	const isSelected = (author) => haveIdentity(getIdentity("list", author.id))

	return (
		<div className={styles.container} >
			<HeaderCmp
				title="JON Documentation"
				subtitle="Priolo22"
				date="14/08/75"
				identity={identity}
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
