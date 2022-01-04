import styles from './Input.module.scss';


export default function Input({
	value,
	renderEnd,
	onChange,
	...props
}) {

	const handleChange = e => onChange?.(e)

    return (
		<div className={styles.container}>
			<input 
				className={styles.input}
				type="text"
				onChange={handleChange}
				value={value}
				{...props}
			/>
			{renderEnd && <div className={styles.end}>
				{renderEnd}
			</div>}
		</div>
    )
}
