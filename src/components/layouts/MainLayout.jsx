import styles from './MainLayout.module.scss';
import React, { useEffect, useRef } from 'react'

import MenuLayout from './MenuLayout';
import ElementLayout from "../element/ElementLayout"
import PolyLayout from '../element/PolyLayout';
import Tree from "../app/tree/Tree"

import { ELEMENT_TYPE, useElement } from "../../store/element"
import { useMenu } from "../../store/menu"


import MsgBox from '../app/MsgBox';
import { useLayout } from '../../store/layout';
import DebugButton from '../app/debug/DebugButton';



/**
 * Gestisce l'intera app 
 * @returns 
 */
function MainLayout() {


    // HOOKs
    const { state: elements, fetch: fetchDoc, open, update } = useElement()
    const { state: menu, fetch: fetchMenu, setAll } = useMenu()
    const { state: layout, dialogOpen } = useLayout()

    useEffect(() => {
        fetchDoc()
        //fetchMenu()
        update()
    }, [])

    const refStates = useRef()


    // HANDLE
    const handleChangeExpanded = (value) => {
        setAll(value)
    }
    const handleClickNode = (node) => {
    }
    const handleClickMenu = (node) => {

        const c = {
            "login": () => {
                open({
                    type: ELEMENT_TYPE.LOGIN,
                    options: { singletone: true }
                })
            },
            "register": () => {
                open({
                    type: ELEMENT_TYPE.REGISTER,
                    options: { singletone: true }
                })
            },
        }[node.id]()
    }


    // RENDER

    return (
        <div className={styles.main}>

            {/* DOCUMENTI APERTI */}
            <div className={styles.contAbs}>
                <div className={styles.contHorizDoc}>

                    {/* spazio vuoto a sinistra del primo doc */}
                    <div className={styles.docLeftSpace} />

                    {elements.all.map((element, index) => (
                        <ElementLayout key={element.id}>
                            <PolyLayout content={element} />
                        </ElementLayout>
                    ))}

                    {/* spazio vuoto a destra dell'ultimo doc */}
                    <div className={styles.docLeftSpace} />

                </div>
            </div>

            {/* MENU LATERALE */}
            <div className={styles.contAbsMenu}>
                <div className={styles.contHorizMenu}>

                    <ElementLayout>
                        <MenuLayout />
                    </ElementLayout>

                </div>
            </div>

            {/* MESSAGE BOX */}
            <MsgBox />

            {/* DEBUG BUTTON */}
            <DebugButton/>

        </div>
    )
}

export default MainLayout


