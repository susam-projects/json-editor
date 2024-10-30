import React from 'react';
import { Editor } from '../components/Editor/Editor.tsx';
import { Button, Typography } from 'antd';
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
		closeSetDataModal,
		handleSetData,
	};
};

export const EditorPage: React.FC = () => {
	const { styles } = useStyles();

	const {
		isSetDataModalOpen,
		openSetDataModal,
		closeSetDataModal,
		handleSetData,
	} = useJsonData();

	return (
		<Page>
			<Typography.Title className={styles.title}>{textEn.editorPage.title}</Typography.Title>
			<Button type="primary" className={styles.dataButton} onClick={openSetDataModal}>{textEn.editorPage.setDataButton}</Button>
			<Editor />
			<SetDataModal isOpen={isSetDataModalOpen} onOk={handleSetData} onCancel={closeSetDataModal} />
		</Page>
	);
};
