import React, { useEffect, useRef } from 'react'

import MenuLayout from './MenuLayout';
import ElementLayout from "./ElementLayout"
import PolyLayout from './PolyLayout';
import Tree from "../app/Tree"

import { DOC_TYPE, useDoc } from "../../store/doc"
import { useMenu } from "../../store/menu"

import styles from './mainLayout.module.scss';
import MsgBox from '../app/MsgBox';
import { useLayout } from '../../store/layout';
import { recorder, player } from '@priolo/jon'




/**
 * Gestisce l'intera app 
 * @returns 
 */
function MainLayout() {


    // HOOKs
    const { state: doc, fetch: fetchDoc, open } = useDoc()
    const { state: menu, fetch: fetchMenu, setAll } = useMenu()
    const { state: layout, dialogOpen } = useLayout()

    useEffect(() => {
        fetchDoc()
        fetchMenu()
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
                    type: DOC_TYPE.LOGIN,
                    options: { singletone: true }
                })
            },
            "register": () => {
                open({
                    type: DOC_TYPE.REGISTER,
                    options: { singletone: true }
                })
            },


            "recStart": () => {
                recorder.recorderStart()
            },
            "recStop": () => {
                const states = recorder.recorderStop()
                refStates.current = states
                
            },
            "recCheck": () => {
                recorder.recorderCheck()
            },
            "play": () => {
                player.playerStart(refStates.current)
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

                    {doc.all.map((doc, index) => (
                        <ElementLayout key={doc.id}>
                            <PolyLayout content={doc} />
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
                        <MenuLayout
                            renderBottom={<Tree onClickNode={handleClickMenu} values={[
                                { label: "Login", id: "login" },
                                { label: "Register", id: "register" },
                                { label: "rec start", id: "recStart" },
                                { label: "rec check", id: "recCheck" },
                                { label: "rec stop", id: "recStop" },
                                { label: "play", id: "play" },
                            ]} />}
                        >
                            <Tree
                                values={menu.all}
                                onClickNode={handleClickNode}
                                onChangeExpanded={handleChangeExpanded}
                            />
                        </MenuLayout>
                    </ElementLayout>

                    <ElementLayout>
                        <MenuLayout >
                            ciccio
                        </MenuLayout>
                    </ElementLayout>

                </div>
            </div>

            {/* MESSAGE BOX */}
            <MsgBox />

        </div>
    )
}

export default MainLayout


