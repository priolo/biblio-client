import { ELEMENTS_TYPE } from "store/doc"
import Chapter from "./Chapter"
import Paragraph from "./Paragraph"
import Text from "./Text"



export default function BiblioElement(props) {

	switch (props.element.type) {
		case ELEMENTS_TYPE.CHAPTER:
			return <Chapter {...props} />
		case ELEMENTS_TYPE.PARAGRAPH:
			return <Paragraph {...props} />
		case ELEMENTS_TYPE.TEXT:	
		default:
			return <Text {...props} />
	}
}
