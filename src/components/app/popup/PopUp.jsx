import { useEffect, useRef } from 'react'
import { useLinkPopUp } from 'store/doc/dialogs/link'
import styles from './PopUp.module.scss'



export default function PopUp({
    isOpen,
    position,
    children,
    onClose,
    ...props
}) {

    // HOOKs
    const { close } = useLinkPopUp()
    const ref = useRef(null)
    useEffect(() => {
        if (!ref.current) return
        const eventFn = (e) => {
            if (ref.current.contains(e.target)) return
            close()
            document.removeEventListener("mousedown", eventFn)
        }
        if (isOpen) {
            document.addEventListener("mousedown", eventFn)
            setTimeout(() => ref.current.focus(), 200)
        }
    }, [isOpen, ref.current])

    // HANDLER
    const handleBlur = (e) => {
        // if ( !ref.current.contains( e.target) ) {
        //     close()
        // }
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
