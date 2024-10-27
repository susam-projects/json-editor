import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App.tsx';

const rootNode = document.getElementById('root');
if (rootNode) {
	createRoot(rootNode).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
} else {
	throw new Error("Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in the HTML file.");
}
