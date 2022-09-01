import styles from './Leaf.module.scss'
import storeLinkPopUp from 'store/doc/dialogs/link'
import {getElementStore} from 'store/doc'


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

	// HANDLER
	const handleClick = leaf.link ? (e) => {
		const { open } = storeLinkPopUp
		const { state:docNs, getEntryTextSelect } = getElementStore(doc.identity)
		
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
