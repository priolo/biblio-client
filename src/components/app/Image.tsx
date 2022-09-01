import styles from './Image.module.scss';


export default function Image({
	src,
	children,

	className = "",
	onClick,
	onDoubleClick,
}) {
	return (
		<div
			className={`${styles.container} ${className}`}
			onClick={onClick}
			onDoubleClick={onDoubleClick}
		>
			{children}
			<div className={styles.image}
				style={{ backgroundImage: `url(${src})` }}
			></div>
		</div>
	)
}
