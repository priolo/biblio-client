import React from 'react';
import ReactDOM from 'react-dom';
import 'style/index.scss'
import App from './App';
//import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router } from "react-router-dom";
import { MultiStoreProvider } from '@priolo/jon'
import setups from 'store'
import './plugins/i18n';



function Base() {
	return (
		<MultiStoreProvider setups={setups}>
			<Router>
				<App />
			</Router>
		</MultiStoreProvider>
	)
}

ReactDOM.render(<Base />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
