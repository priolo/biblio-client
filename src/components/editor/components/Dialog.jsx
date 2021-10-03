import styles from './Dialog.module.scss'

import { useEditorDialog } from 'store/editorDialog'
import DialogVertical from 'components/app/DialogVertical'
import Item from './Item'
import { getUrlHash } from 'store/url'
import { useStore } from '@priolo/jon'
import { ELEMENTS_TYPE } from 'store/doc'


export default function Dialog() {

    // HOOKs

    const { state: dialog, close, isSelected } = useEditorDialog()
    const docSelect = getUrlHash()
    const { state: doc, setValue } = useStore(docSelect)


    // HANDLE

    const handleOnClick = (item, e) => {
        setValue ( [
            {
				type: ELEMENTS_TYPE.PARAGRAPH,
				children: [{ text: 'evvai!!!!' }],
			},
        ])
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
