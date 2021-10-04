import styles from './Dialog.module.scss'

import { useEditorDialog } from 'store/editorDialog'
import DialogVertical from 'components/app/DialogVertical'
import Item from './Item'
import { getUrlHash } from 'store/url'
import { useStore } from '@priolo/jon'
import { ELEMENTS_TYPE } from 'store/doc'
import { Editor, Transforms } from 'slate'


export default function Dialog() {

    // HOOKs

    const { state: dialog, close, isSelected } = useEditorDialog()
    const docSelect = getUrlHash()
    const docStore = useStore(docSelect)
    if ( !docStore ) return null
    const { state: doc, setValue } = docStore

    

    // HANDLE

    const handleOnClick = (item, e) => {
        Transforms.setNodes(
            doc.editor,
            { type: item.id },
            { match: n => Editor.isBlock(doc.editor, n) }
        )
    }

    // RENDER

    return (
        <DialogVertical
            position={dialog.position}
            isOpen={dialog.isOpen}
        >
            {dialog.items.map((item, i) => (
                <Item key={item.id}
                    onClick={handleOnClick}
                    item={item}
                    isSelect={isSelected(item.id)}
                />
            ))}
        </DialogVertical>
    )
}
