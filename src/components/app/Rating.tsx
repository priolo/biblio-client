import styles from './Rating.module.scss';

import StarIcon from 'imeges/icons/StarIcon';


export default function Rating({
	className="",
}) {
    return (
        <div className={`${styles.container} ${className}`} >
			{Array.from({length:5}).map( (_, index) =>(
				<StarIcon key={index}/>
			))}
        </div>
    )
}

