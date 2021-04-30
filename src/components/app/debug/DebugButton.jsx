import styles from './debugButton.module.scss';


function DebugButton({
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

export default DebugButton
