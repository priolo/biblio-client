import { BLOCK_TYPE } from "store/doc"
import Chapter from "./Chapter"
import Paragraph from "./Paragraph"
import Text from "./Text"
import Image from "./Image"



export default function BiblioElement(props) {

	switch (props.element.type) {
		case BLOCK_TYPE.CHAPTER:
			return <Chapter {...props} />
		case BLOCK_TYPE.PARAGRAPH:
			return <Paragraph {...props} />
		case BLOCK_TYPE.IMAGE:
			return <Image {...props} />
		case BLOCK_TYPE.TEXT:	
		default:
			return <Text {...props} />
	}
}
