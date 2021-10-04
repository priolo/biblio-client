import styles from './Dialog.module.scss'

import { useEditorDialog } from 'store/editorDialog'
import DialogVertical from 'components/app/DialogVertical'
import Item from './Item'
import { getUrlHash } from 'store/url'
import { useStore } from '@priolo/jon'
import { ELEMENTS_TYPE } from 'store/doc'
import { Editor, Text, Transforms } from 'slate'
import ButtonIcon from 'components/app/ButtonIcon'
import BoldIcon from 'imeges/icons/BoldIcon'
import ItalicIcon from 'imeges/icons/ItalicIcon'


export default function Dialog() {

    // HOOKs

    const { state: dialog, close, isSelected } = useEditorDialog()
    const docSelect = getUrlHash()
    const docStore = useStore(docSelect)
    if (!docStore) return null
    const { state: doc, isBold } = docStore


    // HANDLE

    const handleClickType = (item, e) => {
        Transforms.setNodes(
            doc.editor,
            { type: item.id },
            { match: n => Editor.isBlock(doc.editor, n) }
        )
    }

    const handleClickBold = (e) => {
        Transforms.setNodes(
            doc.editor,
            { bold: bold ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    }

    const handleClickItalic = (e) => {
    }

    // RENDER

    const bold = isBold()

    return (
        <DialogVertical
            position={dialog.position}
            isOpen={dialog.isOpen}
        >
            <div className={styles.formatButtons}>
                <ButtonIcon onClick={handleClickBold} isSelect={bold}>
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
