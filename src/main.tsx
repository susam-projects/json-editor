import { createRoot } from 'react-dom/client';
import { App } from './app/App.tsx';

const rootNode = document.getElementById('root');
if (rootNode) {
	// the used React version is not requiring a 'react' import
	// eslint-disable-next-line react/react-in-jsx-scope
	createRoot(rootNode).render(<App />); // not using React.StrictMode to be able to see the actual performance in dev mode.
} else {
	throw new Error("Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in the HTML file.");
}
