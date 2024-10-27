import React from 'react';
import { Editor } from '../components/Editor/Editor.tsx';
import { Button } from 'antd';
import { Page } from '../../layout';

export const EditorPage: React.FC = () => {
	return (
		<Page>
			<Button>Set data</Button>
			<Editor />
		</Page>
	);
};
