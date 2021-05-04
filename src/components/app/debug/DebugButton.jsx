import { recorder, player } from '@priolo/jon';
import { RECORDER_STATE } from '@priolo/jon/dist/lib/store/recorder';
//import { getAllStates, setAllState } from '@priolo/jon';
import { useState } from 'react';
import styles from './debugButton.module.scss';
import ajax from "../../../plugins/AjaxService";


const shots = [
	"login",
	"login2",
	"login3",
	"login4",
]


function DebugButton({
}) {

	// HOOKs
	const [msg, setMsg] = useState("stop")
	const [shotSel, setShotSel] = useState(null)

	// HANDLEs

	// recorder
	const handleClickRecStart = e => {
		recorder.recorderStart()
		setMsg("rec : start")
	}
	const handleClickRecCheck = e => {
		recorder.recorderCheck()
		setMsg("rec : check!")
	}
	const handleClickRecStop = e => {
		const states = recorder.recorderStop()
		clipboardSet(JSON.stringify(states))
		setMsg("rec : stop : clipboard")
	}

	// player
	const handleChangeShot = async e => {
		const shot = e.target.value
		setShotSel(shot)
		if ( shot == "" ) return
		const module = await import(`./shots/${shot}.json`)
		// reset server
		await ajax.post("debug/reset")
		player.playerStart(module.default)
	}




	// // state load/save
	// const handleClickSave = e => {
	// 	const states = getAllStates()
	// 	clipboardSet(JSON.stringify(states))
	// 	setMsg("state >>> clipboard")
	// }
	// const handleClickLoad = async e => {
	// 	const statesStr = await clipboardGet()
	// 	const states = JSON.parse(statesStr)
	// 	setAllState(states)
	// 	setMsg("clipboard >>> state")
	// }


	// RENDER
	const state = recorder.recorderState()

	return (
		<div className={styles.root} >

			<div className={styles.buttons}>

				{state == RECORDER_STATE.STOP &&
					<button className={styles.btt} onClick={handleClickRecStart}>rec</button>
				}

				{state == RECORDER_STATE.PLAY && (<>
					<button className={styles.btt} onClick={handleClickRecCheck}>check</button>
					<button className={styles.btt} onClick={handleClickRecStop}>stop</button>
				</>)}

				{state == RECORDER_STATE.STOP && (<>
					<div className={styles.space} />

					<select onChange={handleChangeShot} value={shotSel}>
						<option key="default" default value="">select shot</option>
						{shots.map((shot, index) => (
							<option key={index} value={shot}>{shot}</option>
						))}
					</select>

					{/* 
					<div className={styles.space} />

					<button className={styles.btt} onClick={handleClickSave}>save</button>
					<button className={styles.btt} onClick={handleClickLoad}>load</button> 
					*/}
				</>)}
			</div>

			<div className={styles.msg}>{msg}</div>
		</div>
	)
}

export default DebugButton


/**
 * Copia in clipboard un testo
 * @param {string} text da copiare nella clipboard
 */
export function clipboardSet(text) {
	const el = document.createElement('textarea');
	el.value = text;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
};

/**
 * Restituisce il testo contenuto nella clipboard
 */
export async function clipboardGet() {
	return await navigator.clipboard.readText();
}