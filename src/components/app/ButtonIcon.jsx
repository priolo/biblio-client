import styles from './ButtonIcon.module.scss';


export default function ButtonIcon({
	children,
	onClick
}) {
    return (
		<div 
			className={styles.container}
			onClick={onClick}
		>
			{children}
		</div>
    )
}
