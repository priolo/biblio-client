import styles from './Actions.module.scss';


export default function Actions({
	className="",
	actions,
	onClick
}) {
	return (
		<div className={`${styles.container} ${className}`}>

			{actions.map(action => (
				<div key={action.label}
					className={styles.action}
					onClick={_ => onClick(action)}
				>
					{action.label}
				</div>
			))}

		</div>
	)
}
