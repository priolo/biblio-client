import styles from './LinkPopUp.module.scss'

import PopUp from 'components/app/popup/PopUp'
import { useLinkPopUp } from 'store/doc/dialogs/link'
import Input from 'components/app/Input'
import { Editor, Transforms } from 'slate'
import { useStore } from '@priolo/jon'
import { useEffect, useRef, useState } from 'react'


/**
 * E' la dialog che permette di scegliere lo stile del BLOCK
 */
export default function LinkPopUp({
    element
}) {


    // HOOKs
    const refInput = useRef(null)
    const { state: docNs } = useStore(element.identity)
    const { state: linkNs } = useLinkPopUp()
    if (!linkNs.path) return null

    const path = linkNs.path
    const [node] = Editor.leaf(docNs.editor, path )
    const isOpen = element.identity == linkNs.idOpen
    

    // HANDLE
    const handleChange = (e) => {
        const url = e.target.value
        const nodeUpdate = { url }
        Transforms.setNodes(docNs.editor,
            nodeUpdate,
            {
                at: path,
                mode: 'all'
            }
        )
    }

    const handleFocus = e => {
        refInput.current?.focus()
    }


    // RENDER
    return (
        <PopUp
            position={linkNs.position}
            isOpen={isOpen}
            onFocus={handleFocus}
        >
            <Input 
                tabIndex={0} 
                className={styles.input} 
                value={node.url ?? ""} 
                onChange={handleChange}
                ref={refInput}
            />
        </PopUp>
    )
}
