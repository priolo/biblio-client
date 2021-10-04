import styles from './ButtonIcon.module.scss';


export default function ButtonIcon({
	children,
	onClick,
	isSelect,
}) {

	const cnRoot = `${styles.root} ${isSelect ? styles.select : ""}`

    return (
		<div 
			className={cnRoot}
			onClick={onClick}
		>
			{children}
		</div>
    )
}
