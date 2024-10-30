import React from 'react';
import { Editor } from '../components/Editor/Editor.tsx';
import { Button, Space, Typography } from 'antd';
import { Page } from '../../layout';
import { useStyles } from './EditorPage.styles.ts';
import { textEn } from '../../text';
import { SetDataModal } from '../components/SetDataModal/SetDataModal.tsx';

const useJsonData = () => {
	const [data, setData] = React.useState([]);
	const [isSetDataModalOpen, setIsSetDataModalOpen] = React.useState(false);

	const openSetDataModal = () => {
		setIsSetDataModalOpen(true);
	};

	const closeSetDataModal = () => {
		setIsSetDataModalOpen(false);
	};

	const handleSetDataCancel = () => {
		closeSetDataModal();
	};

	const handleSetData = (newData: string) => {
		try {
			const newDataObject = JSON.parse(newData);
			setData(newDataObject);
		} catch {
			// do nothing in this case
		}
		closeSetDataModal();
	};

	return {
		data,
		isSetDataModalOpen,
		openSetDataModal,
		handleSetDataCancel,
		handleSetData,
	};
};

export const EditorPage: React.FC = () => {
	const { styles } = useStyles();

	const {
		isSetDataModalOpen,
		openSetDataModal,
		handleSetDataCancel,
		handleSetData,
	} = useJsonData();

	return (
		<Page>
			<Space direction="vertical" size="large" className={styles.wrapper}>
				<Typography.Title className={styles.title}>{textEn.editorPage.title}</Typography.Title>
				<Button type="primary" onClick={openSetDataModal}>{textEn.editorPage.setDataButton}</Button>
				<Editor />
			</Space>
			<SetDataModal isOpen={isSetDataModalOpen} onOk={handleSetData} onCancel={handleSetDataCancel} />
		</Page>
	);
};
