import styles from './MainLayout.module.scss';
import { TransitionGroup, CSSTransition } from "react-transition-group"

import MenuLayout from './MenuLayout';
import ElementLayout from "../element/ElementLayout"
import PolyLayout from '../element/PolyLayout';
import MsgBox from '../app/MsgBox';
import DebugButton from '../app/debug/DebugButton';

import { useUrl } from 'store/url';
import EditorDialog from '../editor/components/DocVerticalDialog';
import EditCodeDialog from 'components/editor/components/EditCodeDialog';


/**
 * Gestisce l'intera app 
 * @returns 
 */
export default function MainLayout() {

    // HOOKs
    const { state: url, getElements } = useUrl()


    // RENDER
    const elements = getElements()

    return (
        <div className={styles.container} >

            {/* DOCUMENTI APERTI */}
            <div className={styles.contAbs}>
                <div className={styles.contHorizDoc}>

                    {/* spazio vuoto a sinistra del primo doc */}
                    <div className={styles.docLeftSpace} />

                    <TransitionGroup component={null}>

                        {elements.map((element) => (
                            <CSSTransition key={element.identity}
                                classNames={styles}
                                //unmountOnExit
                                //mountOnEnter
                                //appear // appare la prima volta in automatico
                                timeout={{ enter: 500, exit: 300 }}
                            >
                                <PolyLayout element={element} />
                            </CSSTransition>
                        ))}

                    </TransitionGroup>

                    {/* spazio vuoto a destra dell'ultimo doc */}
                    <div className={styles.docLeftSpace} />

                    {/* dialog verticale */}
                    <EditorDialog />
                    <EditCodeDialog />

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
            <DebugButton />

        </div>
    )
}




