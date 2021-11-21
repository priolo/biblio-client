// import { BLOCK_TYPE } from "store/doc"
// import Chapter from "./Chapter"
// import Paragraph from "./Paragraph"
// import Text from "./Text"
// import Image from "./Image"
// import Code from "./Code"



export default function BiblioLeaf(props) {

	// switch (props.element.type) {
	// 	case BLOCK_TYPE.CHAPTER:
	// 		return <Chapter {...props} />
	// 	case BLOCK_TYPE.PARAGRAPH:
	// 		return <Paragraph {...props} />
	// 	case BLOCK_TYPE.IMAGE:
	// 		return <Image {...props} />
	// 	case BLOCK_TYPE.CODE:
	// 		return <Code {...props} />
	// 	case BLOCK_TYPE.TEXT:	
	// 	default:
			return <Leaf {...props} />
	//}
}



// [II] mettere fuori
// 	attributes: { data-slate-leaf: true }
// 	children: {...}
// 	leaf: { text: 'descrizionefmo paragrafo' }
// 	text: { text: 'descrizionefmo paragrafo' }
const Leaf = props => {

	// const selected = useSelected()
	// const focused = useFocused()
	// const html = hljs.highlightAuto('<h1>Hello World!</h1>').value
	// if ( !focused && props.leaf.code == true ) return <span 
	// 	{...props.attributes}
	// 	dangerouslySetInnerHTML={{ __html: html }} />

	return (
		<span
			{...props.attributes}
			style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' } }
		>
			{props.children}
		</span>
	)
}