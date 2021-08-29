import styles from "./AuthorsLayout.module.scss"

import { getStoreAuthor } from "store/author"
import HeaderCmp from "../HeaderCmp"
import FinderCmp from "../FinderCmp"
import AuthorItemCard from "./AuthorItemCard"
import Actions from "components/app/Actions"


export default function AuthorsLayout() {

	// HOOKs

	const { state:author } = getStoreAuthor()

	// HANDLE

	// RENDER

	const authors = author.all

	return (
		<div className={styles.container} > 
			<HeaderCmp
				title = "JON Documentation"
				subtitle="Priolo22"
				date="14/08/75"
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
			<div className={styles.body} >
				{authors.map ( author => (
					<AuthorItemCard key={author.id}
						className={styles.card} 
						author={author}
					/>
				))}
			</div> 
		</div>
	)
}
