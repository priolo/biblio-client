import styles from './ButtonIcon.module.scss';


export default function ButtonIcon({
	isSelect,
	...props
}) {

	const { children, onClick } = props


	const cnRoot = `${styles.root} ${isSelect ? styles.select : ""}`

	return (
		<div
			className={cnRoot}
			onClick={onClick}
			{...props}
		>
			{children}
		</div>
	)
}
