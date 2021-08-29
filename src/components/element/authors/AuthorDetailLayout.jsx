import styles from "./AuthorDetailLayout.module.scss"


import HeaderCmp from "../HeaderCmp"
import FinderCmp from "../FinderCmp"
import Actions from "components/app/Actions"
import DocItem from "./DocItem"
import { useAuthorDetail } from "store/authorDetail"


export default function AuthorDetailLayout() {

	// HOOKs

	const { state:author } = useAuthorDetail()

	// HANDLE
	

	// RENDER

	const docs = author.docs

	return (
		<div className={styles.container} > 
			<HeaderCmp
				title = {author.name}
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
			<div className={styles.list}>
				{docs.map ( doc => (
					<DocItem 
						key={doc.id}
						className={styles.doc} 
						doc={doc}
					/>
				))}
			</div> 
		</div>
	)
}
