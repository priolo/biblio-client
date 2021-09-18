import Chapter from "./Chapter"
import Paragraph from "./Paragraph"




export default function BiblioElement(props) {

	switch (props.element.type) {
		case 'code':
			return <Chapter {...props} />
		default:
			return <Paragraph {...props} />
	}
}
