import styles from "./FinderCmp.module.scss"

import InputTags from "components/app/InputTags"
import { useUrl } from "store/url"
import { useCallback, useEffect, useRef } from "react"



export default function FinderCmp({
	value,
	onChange,
	element,
}) {

	// HOOKs

	const { state: url, getHash } = useUrl()
	const hash = getHash()
	const inputRef = useCallback(node => {
		if (!node || !hash || !element?.identity || hash != element.identity) return
		node?.focus()
	}, [hash]);

	// RENDER

	return (
		<div className={styles.container}>
			<InputTags
				inputRef={inputRef}
				value={value}
				onChange={onChange}
			/>
		</div>
	)
}

