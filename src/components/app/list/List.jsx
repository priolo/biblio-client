import styles from './List.module.scss';


export default function List({
	children,
	onClick
}) {
    return (
        <div className={styles.root}>
			{children && <div>{children}</div>}
        </div>
    )
}
