import styles from "./DocItem.module.scss"

import Card from "components/app/Card"
import { useAuthor } from "store/author"
import { useElement } from "store/element"


export default function DocItem({
	className = "",
	author = null,
}) {

	// HOOKs
	const { isSelected, toggleSelected } = useAuthor()
	const { open } = useElement()

	// HANDLE
	const handleClick = _ => toggleSelected(author.id)
	const handleDblClick = _ => {
		console.log("dbl click")
		open ( "list" )
	}

	// RENDER

	const selected = isSelected(author.id)

	return (
		<Card cliccable
			className={className}
			title={author.name}
			mediaSrc={`/images/${author.imageSrc}`}
			selected={selected}
			onClick={handleClick}
			onDoubleClick={handleDblClick}
		/>
	)
}

