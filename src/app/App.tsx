import React from 'react';
import { ConfigProvider } from 'antd';
import { EditorPage } from '../editor';
import { theme } from './theme.ts';

import 'antd/dist/reset.css';

export const App: React.FC = () => {
	return (
		<ConfigProvider theme={theme}>
			<EditorPage />
		</ConfigProvider>
	);
};
