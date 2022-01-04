import styles from './DialogVertical.module.scss'

import CloseIcon from "imeges/close"


export default function DialogVertical({
    isOpen,
    position,
    children,
    onClose,
}) {

    // HOOKs

    const handleFocus = event => {
        event.preventDefault()
        event.stopPropagation()
        if (event.relatedTarget) {
            // Revert focus back to previous blurring element
            event.relatedTarget.focus();
        } else {
            // No previous focus target, blur instead
            event.currentTarget.blur();
        }
    }

    // RENDER
    const cnContainer = `${styles.container} ${isOpen ? styles.open : ""}`

    if (!position) return null

    return (
        <div tabIndex="-1"
            className={cnContainer}
            style={{ left: position.left }}
            onFocus={handleFocus}
        >
            {children}
        </div>
    )
}
