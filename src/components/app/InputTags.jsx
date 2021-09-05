import styles from './Input.module.scss';

import { forwardRef, useEffect, useRef, useState } from 'react';

import FindIcon from "imeges/icons/FindIcon"
import ButtonIcon from './ButtonIcon';
import AddIcon from 'imeges/icons/AddIcon';
import DialogVertical from './DialogVertical';


export default function InputTags ({
	value = "",
	tagsSelect = [],
	tags = [],
	onChange,
	inputRef
}) {

	// HOOKs

	const [isOpen, setIsOpen] = useState(false)
	const containerRef = useRef(null);
	//const inputRef = useRef(null);
	useEffect ( ()=> {
		//inputRef.current?.addEventListener("focus", handleOnFocus)
		inputRef.current?.addEventListener("blur", handleOnBlur)
		return ()=>{
			//inputRef.current?.removeEventListener("focus", handleOnFocus)
			inputRef.current?.removeEventListener("blur", handleOnBlur)
		}
	 },[inputRef.current])

	// HANDLER

	const handleChange = e => onChange?.(e)
	const handleAddTag = e => {
		setIsOpen (true)
	}
	const handleCloseDialog = _ => {

	}
	const handleOnFocus = (e) => {
		setIsOpen(true)
	}
	const handleOnBlur = (e) => {
		setIsOpen(false)
	}

	// RENDER

	const position = containerRef.current?.getBoundingClientRect()

	return (<>

		<div 
			className={styles.container}
			ref={containerRef}
		>
			<input
				ref={inputRef}
				className={styles.input}
				type="text"
				onChange={handleChange}
				value={value}
			/>
			<ButtonIcon onClick={handleAddTag}>
				<FindIcon />
			</ButtonIcon>
		</div>

		<DialogVertical 
			isOpen={isOpen}
			onClose={handleCloseDialog}
			position={position}
		>
			<div>PIPPOBELLO</div>
		</DialogVertical>
	</>)
}

