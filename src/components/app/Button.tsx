import styles from './Button.module.scss';


export default function Button({
	children,
	icon,
	onClick
}) {
    return (
        <div className={styles.root} onClick={onClick}>
			{children && <div className={styles.label}>{children}</div>}
			{icon && <div className={styles.icon}>{icon}</div>}
        </div>
    )
}
