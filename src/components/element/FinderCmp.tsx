import styles from "./FinderCmp.module.scss"

import InputTags from "components/app/InputTags"
import { useUrl, getUrlHash } from "store/url/utils"
import { useCallback, useEffect, useRef } from "react"



export default function FinderCmp({
	value,
	onChange,
	element,
}) {

	// HOOKs

	const hash = getUrlHash()
	const inputRef = useCallback(node => {
		if (!node || !hash || !element?.identity || hash != element.identity) return
		setTimeout( ()=>node?.focus(), 500 )
		
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

