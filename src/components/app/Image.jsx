import styles from './Image.module.scss';


export default function Image({
	src,

	className="",
	onClick,
	onDoubleClick,
}) {
    return (
        <div 
			className={`${styles.container} ${className}`} 
			style={{backgroundImage: `url(${src})`}}
			onClick={onClick}
			onDoubleClick={onDoubleClick}
		></div>
    )
}
