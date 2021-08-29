import styles from './Card.module.scss'

import OptionsIcon from 'imeges/icons/OptionsIcon';
import ButtonIcon from './ButtonIcon';
import Image from './Image';
import Rating from './Rating';


export default function Card({
	title = "",
	mediaSrc = null,
	cliccable = false,
	selected = false,

	className = "",
	onClick,
	onDoubleClick,
}) {


	// HANDLERs

	// RENDER

	const cnCliccable = cliccable ? "cliccable" : ""
	const cnSelected = selected ? styles.selected : ""

	return (
		<div className={`${styles.container} ${cnSelected} ${className}`}>

			<Image
				src={mediaSrc}
				className={`${styles.media} ${cnCliccable} ${cnSelected}`}
				onClick={onClick}
				onDoubleClick={onDoubleClick}
			>
				{selected && <div className={styles.overlay} />}
			</Image>

			<div
				className={`${styles.title} ${cnCliccable}`}
				onClick={onClick}
				onDoubleClick={onDoubleClick}
			>
				{title}
			</div>

			<div className={styles.buttons}>
				<Rating className={styles.rating} />
				<ButtonIcon>
					<OptionsIcon />
				</ButtonIcon>
			</div>

		</div>
	)
}
