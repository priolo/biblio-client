import styles from './EditTypeDialog.module.scss'

import DialogVertical from 'components/app/DialogVertical'
import Item from './Item'
import ButtonIcon from 'components/app/ButtonIcon'
import BoldIcon from 'imeges/icons/BoldIcon'
import ItalicIcon from 'imeges/icons/ItalicIcon'
import { ELEMENT_TYPE } from 'store/url/utils'
import typeDialogStore from 'store/doc/dialogs/type'
import { Text } from 'slate'
import { useStore } from '@priolo/jon'
import Swap from 'components/app/swap/Swap'
import { getElementStore } from 'store/doc'


/**
 * E' la dialog che permette di scegliere lo stile del BLOCK
 */
export default function EditTypeDialog({
    element
}) {

    // HOOKs
	const dialog = useStore(typeDialogStore)
    const { isSelected } = typeDialogStore
    const store = getElementStore(element.identity)
    const docNs = useStore(store)
    const { changeSelectTypeAndMerge, changeSelectText, getEntryTextSelect, isSelect } = store


    // HANDLE
    const handleClickType = (item, e) => {
        changeSelectTypeAndMerge(item.id)
    }

    const handleClickBold = (e) => {
        changeSelectText({ bold: !leaf.bold })
    }

    const handleClickItalic = (e) => {
    }

    const handleClickLink = (e) => {
        changeSelectText({ link: !leaf.link })
    }


    // RENDER
    if (!docNs || docNs.type != ELEMENT_TYPE.DOC) return null
    const [leaf] = getEntryTextSelect()
    // indica se il documento è selezionato e quindi se questa dialog deve essere aperta o chiusa
    const isOpen = isSelect()//element.identity == dialog.idOpen
    const test = [
        { label: "primo" },
        { label: "secondo" },
        { label: "terzo" },
        { label: "quarto" },
    ]

    return (
        <DialogVertical
            position={{ left: 618 }}
            isOpen={isOpen}
        >
            <Swap
                index={dialog.tabIndex}
            >
                <div>
                    <div className={styles.formatButtons}>
                        <ButtonIcon onClick={handleClickBold} isSelect={leaf.bold}>
                            <BoldIcon />
                        </ButtonIcon>
                        <ButtonIcon onClick={handleClickItalic}>
                            <ItalicIcon />
                        </ButtonIcon>
                        <ButtonIcon onClick={handleClickLink} isSelect={leaf.link}>
                            L
                        </ButtonIcon>
                    </div>

                    {dialog.items.map((item, i) => (
                        <Item key={item.id}
                            onClick={handleClickType}
                            item={item}
                            isSelect={isSelected(item.id)}
                        />
                    ))}
                </div>
                <div>
                    {test.map((item, i) => (
                        <Item key={i}
                            item={item}
                            isSelect={isSelected(item.id)}
                            onClick={e => console.log(item)}
                        />
                    ))}
                </div>
            </Swap>
        </DialogVertical>
    )
}
