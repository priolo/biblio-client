import styles from "./MainLayout.module.scss";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import MenuLayout from "./MenuLayout";
import ElementLayout from "../element/ElementLayout";
import PolyLayout from "../element/PolyLayout";
import MsgBox from "../app/MsgBox";
//import DebugButton from "../app/debug/DebugButton";

import urlStore from "/src/store/url";

//import EditTypeDialog from '../editor/components/EditTypeDialog';
import EditCodeDialog from "../editor/components/EditCodeDialog";
import { useMemo } from "react";
import { useStore } from "@priolo/jon";

//import EditLinkPopUp from '../editor/components/LinkPopUp';

/**
 * Gestisce l'intera app
 */
export default function MainLayout() {
	// HOOKs
	const urlNs = useStore(urlStore);
	const { getElements } = urlStore;

	// RENDER
	const elements = useMemo(() => getElements(), [urlNs.url]);

	return (
		<div className={styles.container}>
			{/* DOCUMENTI APERTI */}
			<div className={styles.contAbs}>
				<div className={styles.contHorizDoc} id="horizScrollElem">
					{/* spazio vuoto a sinistra del primo doc */}
					<div className={styles.docLeftSpace} />

					{/* <TransitionGroup component={null}> */}
					{elements.map((element) => (
						// <CSSTransition
						//   key={element.identity}
						//   classNames={styles}
						//   //unmountOnExit
						//   //mountOnEnter
						//   //appear // appare la prima volta in automatico
						//   timeout={{ enter: 500, exit: 300 }}
						// >
						<PolyLayout key={element.identity} element={element} />
						// </CSSTransition>
					))}
					{/* </TransitionGroup> */}

					{/* spazio vuoto a destra dell'ultimo doc */}
					<div className={styles.docLeftSpace} />

					{/* dialogs utili per l'editazione */}
					{/* <EditTypeDialog /> */}
					{/* <EditLinkPopUp /> */}
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
			{/* <DebugButton /> */}
		</div>
	);
}
