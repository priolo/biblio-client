import { getStore } from "@priolo/jon"
import CloseIcon from "../../../imeges/close"

import Button from "../../app/Button"
import BlockCmp from "./block/BlockCmp"
import styles from "./DocLayout.module.scss"




export default function DocLayout({
	id,
}) {

	// HOOKs

	const { state:doc } = getStore(`doc_${id}`)

	// HANDLE
	const handleClickClose = e => {
		console.log("close()")
	}

	// RENDER

	//if ( !store ) return null

	return (
		<div className={styles.container} >

			<div className={styles.left}>
				<div className={styles.headerSpace} />
				<div className={styles.menu}>
					<div className={styles.link}>Link uno</div>
					<div className={styles.link}>Link due</div>
					<div className={styles.link}>Link tre</div>
					<div className={styles.link}>Link quattro</div>
					<div className={styles.link}>Link cinque</div>
				</div>
			</div>

			<div className={styles.center}>

				<div className={styles.header}>
					<div className={styles.title}>{doc.title}</div>
					<div className={styles.subtitle}>
						<span className={styles.author}>{doc.author}</span>
						<span className={styles.date}>{doc.date}</span>
					</div>
				</div>

				<div className={styles.body}>
					{doc.blocks.map((block, index) => (
						<BlockCmp key={index} block={block} />
					))}
				</div>

			</div>


			<div className={styles.rigth}>
				<div className={styles.icons}>
					<Button icon={<CloseIcon />}
						onClick={handleClickClose}
					/>
				</div>
			</div>

		</div>
	)
}

