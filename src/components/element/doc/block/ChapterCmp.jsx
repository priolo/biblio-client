import styles from "./ChapterCmp.module.scss"


export default function ChapterCmp({
	block
}) {
	return (
		<div className={styles.text}>
			{block.data}
		</div>
	)
}