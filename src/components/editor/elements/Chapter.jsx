import styles from "./Chapter.module.scss"


export default function Chapter({
	attributes, // slate
	children
}) {
	return (
		<pre className={styles.text} {...attributes}>
			<code>{children}</code>
		</pre>
	)
}