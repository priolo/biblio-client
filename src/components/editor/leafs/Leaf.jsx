import styles from './Leaf.module.scss'
import { getStoreLinkPopUp } from 'store/doc/dialogs/link'
import { getStore } from '@priolo/jon'
import { Editor, Range } from 'slate'


// [II] mettere fuori
// 	attributes: { data-slate-leaf: true }
// 	children: {...}
// 	leaf: { text: 'descrizionefmo paragrafo' }

// 	text: { text: 'descrizionefmo paragrafo' }
export default function Leaf ({
	attributes,
	leaf,
	children,
	element,
}) {

	// const selected = useSelected()
	// const focused = useFocused()
	// const html = hljs.highlightAuto('<h1>Hello World!</h1>').value
	// if ( !focused && props.leaf.code == true ) return <span 
	// 	{...props.attributes}
	// 	dangerouslySetInnerHTML={{ __html: html }} />

	// const isUrl = useMemo (()=> {

	// },[leaf.text])


	// HANDLER
	const handleClick = leaf.link ? (e) => {
		const { open } = getStoreLinkPopUp()
		const { state:docNs } = getStore(element.identity)
		
		const left = e.target.offsetLeft// + e.target.offsetWidth
		const top = e.target.offsetTop + e.target.offsetHeight
		const entry = Editor.leaf(docNs.editor, Range.start(docNs.editor.selection))
		open({ 
			id: element.identity,
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
