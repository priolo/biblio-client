import React from 'react'
import styles from './Swap.module.scss'



export default function Swap({
    index,
    children,
}) {

    // HOOKs


    // HANDLER


    // RENDER
    if (isNaN(index)) return null

    return (
        <div 
            className={styles.root}
        >
            {children[index]}
        </div>
    )
}
