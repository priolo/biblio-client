import styles from "./ParagraphCmp.module.scss"


export default function ParagraphCmp({
	block
}) {
	return (
		<div className={styles.text}>
			{block.data}
		</div>
	)
}