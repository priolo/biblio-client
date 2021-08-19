import ChapterCmp from "./ChapterCmp"
import ParagraphCmp from "./ParagraphCmp"



export default function BlockCmp({
	block
}) {
	switch (block.type) {
		case "chapter":
			return <ChapterCmp block={block} />
		case "paragraph":
		 	return <ParagraphCmp block={block} />
		// case "text":
		// 	return <TextCmp block={block} />
		// case "code-line":
		// 	return <CodeLineCmp block={block} />
		// case "list":
		// 	return <ListCmp block={block} />

		default:
			return null
	}
}