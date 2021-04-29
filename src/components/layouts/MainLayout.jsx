import React, { useEffect } from 'react'

import MenuLayout from './MenuLayout';
import ElementLayout from "./ElementLayout"
import PolyLayout from './PolyLayout';
import Tree from "../app/Tree"

import { DOC_TYPE, useDoc } from "../../store/doc"
import { useMenu } from "../../store/menu"

import styles from './mainLayout.module.scss';
import MsgBox from '../app/MsgBox';
import { useLayout } from '../../store/layout';
import { check, _startStoreSubscribe } from '@priolo/jon/dist/lib/store/recorder';




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
            "debug": () => {
                //const {state:node}  = getStoreNode()
                //console.log(node)

                // check stores
                //check()



                _startStoreSubscribe()



                // const store = getStore("auth")

                // // prelevare lo store
                // console.log(store.state)
                
                // // setta uno stato nuovo
                // const newState = {...store.state}
                // newState.password = "pippo"
                // store.d ( s => newState )

                // // subcribe/unsubscribe dello store
                // store.subscribe((name, payload, result) => {
                //     debugger
                // })

            }
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
                                { label: "Debug", id: "debug" },
                                { label: "Login", id: "login" },
                                { label: "Register", id: "register" }
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


