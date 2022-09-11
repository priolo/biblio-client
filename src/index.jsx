import React from "react"
import { createRoot } from "react-dom/client";
import App from './App';

import '/src/style/index.scss'
import './plugins/i18n';


// APPLICATION
const root = createRoot(document.getElementById('root'))
root.render(
	// <React.StrictMode>
		<App />
	// </React.StrictMode>
)