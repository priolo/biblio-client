import styles from './Leaf.module.scss'
import storeLinkPopUp from '/src/store/doc/dialogs/link'
import {getElementStore} from '/src/store/doc'
import { useStore } from '@priolo/jon'


// [II] mettere fuori
// 	attributes: { data-slate-leaf: true }
// 	children: {...}
// 	leaf: { text: 'descrizionefmo paragrafo' }

// 	text: { text: 'descrizionefmo paragrafo' }
export default function Leaf ({
	attributes,
	leaf,
	children,
	doc,
}) {

	// HOOKs

	const store = getElementStore(doc.identity)
	const docNs = useStore(store)
	const { getEntryTextSelect } = store

	// HANDLER
	const handleClick = leaf.link ? (e) => {
		const { open } = storeLinkPopUp
		
		const left = e.target.offsetLeft// + e.target.offsetWidth
		const top = e.target.offsetTop + e.target.offsetHeight
		const entry = getEntryTextSelect()
		open({ 
			id: doc.identity,
			position: { 
				left,
				top,
			},
			leaf: entry
		})
	}: undefined


	// RENDER
	const cnRoot = `${styles.root} ${leaf.bold ? styles.bold : ""} ${leaf.link ? styles.link : ""}`
	return (
		<span
			{...attributes}
			className={cnRoot}
			onClick={handleClick}
		>
			{children}
		</span>
	)
}
