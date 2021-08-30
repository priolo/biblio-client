import styles from './MainLayout.module.scss';
import { useEffect } from 'react'

import MenuLayout from './MenuLayout';
import ElementLayout from "../element/ElementLayout"
import PolyLayout from '../element/PolyLayout';
import MsgBox from '../app/MsgBox';
import DebugButton from '../app/debug/DebugButton';

import { useElement } from "../../store/element"
import { useUrl } from 'store/url';


/**
 * Gestisce l'intera app 
 * @returns 
 */
 export default function MainLayout() {

    // HOOKs

    const { state: url, getElements } = useUrl()

    // HANDLE


    // RENDER

    const elements = getElements()

    return (
        <div className={styles.container}>

            {/* DOCUMENTI APERTI */}
            <div className={styles.contAbs}>
                <div className={styles.contHorizDoc}>

                    {/* spazio vuoto a sinistra del primo doc */}
                    <div className={styles.docLeftSpace} />

                    {elements.map((element) => (
                        <ElementLayout key={element.identity}>
                            <PolyLayout element={element} />
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




