import { useCallback } from 'react'
import linkStore from 'store/doc/dialogs/link'

import styles from './PopUp.module.scss'



export default function PopUp({
    isOpen,
    position,
    children,
    onClose,
    ...props
}) {

    // HOOKs
    const { close } = linkStore

    const ref = useCallback((node) => {
        if ( !node || !isOpen ) return
        const eventFn = (e) => {
            if (node.contains(e.target)) return
            close()
            document.removeEventListener("mousedown", eventFn)
        }
        document.addEventListener("mousedown", eventFn)
    },[isOpen])


    // HANDLER
    const handleBlur = (e) => {
    }
    const handleFocus = (e) => {
    }

    // RENDER
    const cnRoot = `${styles.root} ${isOpen ? styles.open : ""}`
    if (!position) return null

    return (
        <div tabIndex={-1}
            className={cnRoot}
            style={{ left: position.left, top: position.top }}
            ref={ref}
            onBlur={handleBlur}
            onFocus={handleFocus}
            {...props}
        >
            {children}
        </div>
    )
}
