import React from 'react';
import { ConfigProvider } from 'antd';
import { EditorPage } from '../editor';

import 'antd/dist/reset.css';

export const App: React.FC = () => {
	return (
		<React.StrictMode>
			<ConfigProvider>
				<EditorPage />
			</ConfigProvider>
		</React.StrictMode>
	);
};
