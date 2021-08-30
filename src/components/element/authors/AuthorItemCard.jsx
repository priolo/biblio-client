import styles from "./AuthorItemCard.module.scss"

import Card from "components/app/Card"


export default function AuthorItemCard({
	className = "",
	author = null,
	selected,
	onClick,
}) {

	// HOOKs

	// HANDLE

	const handleClick = _ => onClick(author)

	// RENDER

	return (
		<Card cliccable
			className={className}
			title={author.name}
			mediaSrc={`/images/${author.imageSrc}`}
			selected={selected}
			onClick={handleClick}
		/>
	)
}

