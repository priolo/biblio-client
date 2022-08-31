import { useCallback } from 'react';
import styles from './Input.module.scss';


export default function Input({
	value,
	renderEnd,
	//onChange,
	refInput,
	...props
}) {

	//const handleChange = e => onChange?.(e)

    return (
		<div className={styles.container}>
			<input 
				className={styles.input}
				type="text"
				//onChange={handleChange}
				value={value}
				ref={refInput}
				
				{...props}
			/>
			{renderEnd && <div className={styles.end}>
				{renderEnd}
			</div>}
		</div>
    )
}
