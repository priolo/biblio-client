import styles from './LinkPopUp.module.scss'

import PopUp from 'components/app/popup/PopUp'
import { useLinkPopUp } from 'store/doc/dialogs/link'
import Input from 'components/app/Input'
import { Editor, Node, Transforms } from 'slate'
import { useStore } from '@priolo/jon'
import { useCallback, useEffect, useRef, useState } from 'react'


/**
 * E' la dialog che permette di scegliere lo stile del BLOCK
 */
export default function LinkPopUp({
    element
}) {

    // HOOKs
    const { state: docNs, setFocus } = useStore(element.identity)
    const { state: linkNs, close } = useLinkPopUp()
    const [ value, setValue ] = useState("")

    const isOpen = element.identity == linkNs.idOpen
    const refInput = useCallback((nodeDom) => {
        if (!nodeDom || !isOpen || !path) return
        if ( !Node.has(docNs.editor, path) ) return
        const [node] = Editor.leaf(docNs.editor, path)
    
        setValue(node.url)
        setTimeout(()=>nodeDom.select(), 200)
    }, [isOpen])
    

    // HANDLE
    const handleChange = (e) => {
        const url = e.target.value
        setValue(url)
        const nodeUpdate = { url }
        Transforms.setNodes(docNs.editor,
            nodeUpdate,
            {
                at: path,
                //mode: 'all'
            }
        )
    }

    const handleKeyDown = (e) => {
        if (e.key == "Enter" || e.key == "Escape") {
            e.preventDefault()
            close()
            setFocus()
        }
    }


    // RENDER
    if (!linkNs.path || (linkNs.idOpen && element.identity != linkNs.idOpen)) return null
    const path = linkNs?.path

    return (
        <PopUp
            position={linkNs.position}
            isOpen={isOpen}
        >
            <Input
                tabIndex={0}
                className={styles.input}
                value={value ?? ""}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                refInput={refInput}
            />
        </PopUp>
    )
}
