import styles from './LinkPopUp.module.scss'

import PopUp from 'components/app/popup/PopUp'
import { useLinkPopUp } from 'store/doc/dialogs/link'
import Input from 'components/app/Input'
import { Editor, Transforms } from 'slate'
import { useStore } from '@priolo/jon'
import { useCallback, useEffect, useRef, useState } from 'react'


/**
 * E' la dialog che permette di scegliere lo stile del BLOCK
 */
export default function LinkPopUp({
    element
}) {


    // HOOKs
    const { state: docNs } = useStore(element.identity)
    const { state: linkNs } = useLinkPopUp()
    if (!linkNs.path || (linkNs.idOpen && element.identity != linkNs.idOpen)) return null

    const path = linkNs.path
    const [node] = Editor.leaf(docNs.editor, path)
    const isOpen = element.identity == linkNs.idOpen

    const [ value, setValue ] = useState(node.url)

    const refInput = useCallback((nodeDom) => {
        if (!nodeDom || !isOpen) return
        setTimeout(()=>nodeDom.select(), 200)
    }, [isOpen])


    // HANDLE
    const handleChange = (e) => {
        const url = e.target.value
        //setValue(url)
        const nodeUpdate = { url }
        Transforms.setNodes(docNs.editor,
            nodeUpdate,
            {
                at: path,
                //mode: 'all'
            }
        )
    }

//console.log(node.url)
    // RENDER
    return (
        <PopUp
            position={linkNs.position}
            isOpen={isOpen}
        >
            <Input
                tabIndex={0}
                className={styles.input}
                value={value}
                onChange={handleChange}
                refInput={refInput}
            />
        </PopUp>
    )
}
