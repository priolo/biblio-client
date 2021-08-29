import styles from "./AuthorDetailLayout.module.scss"

import { getStoreAuthor } from "store/author"
import HeaderCmp from "../HeaderCmp"
import FinderCmp from "../FinderCmp"
import AuthorItemCard from "./AuthorItemCard"
import Actions from "components/app/Actions"
import DocItem from "./DocItem"


export default function AuthorDetailLayout() {

	// HOOKs

	const { state:author } = getStoreAuthor()

	// HANDLE

	// RENDER

	const authors = author.all

	return (
		<div className={styles.container} > 
			<HeaderCmp
				title = "Priolo22's documentation"
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
					<DocItem 
						key={author.id}
						className={styles.card} 
						author={author}
					/>
				))}
			</div> 
		</div>
	)
}
