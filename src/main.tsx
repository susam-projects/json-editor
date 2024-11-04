import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App.tsx';

const rootNode = document.getElementById('root');
if (rootNode) {
	createRoot(rootNode).render(<App />); // Don't use React.StrictMode to see the actual performance in dev mode
} else {
	throw new Error("Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in the HTML file.");
}
