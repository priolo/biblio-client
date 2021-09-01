import styles from "./DocLayout.module.scss"

import { useStore } from "@priolo/jon"

import BlockCmp from "./block/BlockCmp"
import HeaderCmp from "../HeaderCmp"



export default function DocLayout({
	element,
}) {

	// HOOKs

	const { state: doc } = useStore(element.identity)

	// HANDLE

	// RENDER

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

				<HeaderCmp
					title={doc.title}
					subtitle={doc.subtitle}
					date={doc.date}
					identity={element.identity}
				/>

				<div className={styles.body}>
					{doc.blocks.map((block, index) => (
						<BlockCmp key={index} block={block} />
					))}
				</div>

			</div>

		</div>
	)
}

