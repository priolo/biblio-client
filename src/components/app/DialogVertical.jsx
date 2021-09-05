import styles from './DialogVertical.module.scss'

import CloseIcon from "imeges/close"
import { useEffect } from 'react'


export default function DialogVertical ({
    isOpen,
    onClose,
    children,
    position,
}) {

    // HOOKs


    // RENDER
    const cnContainer = `${styles.container} ${isOpen ? styles.open : ""}`

    if ( !position ) return null
    
    return (
        <div 
            className={cnContainer} 
            style={{ left: position.right }}
        >
            <div>
                {children}
            </div>
        </div>
    )
}
