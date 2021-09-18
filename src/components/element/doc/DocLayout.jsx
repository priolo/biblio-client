import styles from "./DocLayout.module.scss"
import { useMemo, useState, useCallback, useEffect } from 'react'

import { useStore } from "@priolo/jon"

import HeaderCmp from "../HeaderCmp"
import { useUrl } from "store/url"


// Import the Slate components and React plugin.
import { createEditor } from 'slate'
import { Slate, withReact } from 'slate-react'
import BiblioEditable from "components/editor/BiblioEditable"








export default function DocLayout({
	element,
}) {

	// HOOKs

	const { state: doc, fetch, setValue } = useStore(element.identity)
	const { _update } = useUrl()

	const editor = useMemo(() => withReact(createEditor()), [])

	useEffect(() => {
		fetch()
		_update()
	}, [])


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

				<Slate
					editor={editor}
					value={doc.value}
					onChange={newValue => setValue(newValue)}
				>
					<BiblioEditable editor={editor}/>
				</Slate>

				{/* <div className={styles.body}>
					{doc.blocks.map((block, index) => (
						<BlockCmp key={index} block={block} />
					))}
				</div> */}

			</div>

		</div>
	)
}
