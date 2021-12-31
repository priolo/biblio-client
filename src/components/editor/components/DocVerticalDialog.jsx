import styles from './DocVerticalDialog.module.scss'

import { useEditorDialog } from 'store/editorDialog'
import DialogVertical from 'components/app/DialogVertical'
import Item from './Item'
import { useDocSelect } from 'store/doc'
import ButtonIcon from 'components/app/ButtonIcon'
import BoldIcon from 'imeges/icons/BoldIcon'
import ItalicIcon from 'imeges/icons/ItalicIcon'
import { ELEMENT_TYPE } from 'store/url'


/**
 * E' la dialog che permette di scegliere lo stile del BLOCK
 */
export default function DocVerticalDialog() {

    // HOOKs
    const { state: dialog, close, isSelected } = useEditorDialog()
    const docStore = useDocSelect()
    if (docStore?.state?.type != ELEMENT_TYPE.DOC) return null
    const { state: doc, changeSelectTypeAndMerge, changeSelectText, findInSelectText } = docStore
    const isBold = findInSelectText(n => n.bold)


    // HANDLE
    const handleClickType = (item, e) => {
        changeSelectTypeAndMerge(item.id)
    }

    const handleClickBold = (e) => {
        changeSelectText({ bold: !isBold })
    }

    const handleClickItalic = (e) => {
    }


    // RENDER
    return (
        <DialogVertical
            position={dialog.position}
            isOpen={dialog.isOpen}
        >
            <div className={styles.formatButtons}>
                <ButtonIcon onClick={handleClickBold} isSelect={isBold}>
                    <BoldIcon />
                </ButtonIcon>
                <ButtonIcon onClick={handleClickItalic}>
                    <ItalicIcon />
                </ButtonIcon>
            </div>

            {dialog.items.map((item, i) => (
                <Item key={item.id}
                    onClick={handleClickType}
                    item={item}
                    isSelect={isSelected(item.id)}
                />
            ))}
        </DialogVertical>
    )
}
