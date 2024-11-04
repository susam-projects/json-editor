import React from 'react';
import { Editor } from '../components/Editor/Editor.tsx';
import {
	Button, Modal, Space, Typography,
} from 'antd';
import { Page } from '../../layout';
import { useStyles } from './EditorPage.styles.ts';
import { textEn } from '../../text';
import { SetDataModal } from '../components/SetDataModal/SetDataModal.tsx';
import { objectsToEditorData } from '../service/data.mapper.ts';
import { confirmDeleteLine } from '../components/DeleteLineConfirm/DeleteLineConfirm.ts';
import { ChangeLineHandler, DeleteLineHandler } from '../components/EditorTable/EditorTableLine/EditorTableLine.tsx';
import jsonSample from '../data/json-1000.json';
import { deleteLine, updateLineValue } from '../service/dataUpdater.service.ts';

const useJsonData = () => {
	const [data, setData] = React.useState(objectsToEditorData(jsonSample));
	const [isSetDataModalOpen, setIsSetDataModalOpen] = React.useState(false);
	const [modal, modalContextHolder] = Modal.useModal();

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
			const newDataObjects = JSON.parse(newData);
			if (Array.isArray(newDataObjects)) {
				const newEditorData = objectsToEditorData(newDataObjects);
				setData(newEditorData);
			}
		} catch (err) {
			// to be able to debug the user JSON
			// eslint-disable-next-line no-console
			console.error(textEn.editorPage.error.errorParsingData, err);
		}
		closeSetDataModal();
	};

	const handleLineChange = React.useCallback<ChangeLineHandler>((rowIndex, lineIndex, newValue) => {
		setData((prevData) => {
			return updateLineValue(prevData, rowIndex, lineIndex, newValue);
		});
	}, []);

	const handleDeleteLine = React.useCallback<DeleteLineHandler>((rowIndex, lineIndex) => {
		confirmDeleteLine(modal, {
			rowIndex,
			lineIndex,
			onOk: () => {
				setData((prevData) => {
					return deleteLine(prevData, rowIndex, lineIndex);
				});
			},
		});
	}, [modal]);

	return {
		data,
		isSetDataModalOpen,
		openSetDataModal,
		handleSetDataCancel,
		handleSetData,
		handleLineChange,
		handleDeleteLine,
		modalContextHolder,
	};
};

export const EditorPage: React.FC = () => {
	const { styles } = useStyles();

	const {
		data,
		isSetDataModalOpen,
		openSetDataModal,
		handleSetDataCancel,
		handleSetData,
		handleLineChange,
		handleDeleteLine,
		modalContextHolder,
	} = useJsonData();

	return (
		<Page>
			<Space direction="vertical" size="large" className={styles.verticalSpace}>
				<Space direction="vertical" size="small" className={styles.verticalSpace}>
					<Typography.Title className={styles.title}>{textEn.editorPage.title}</Typography.Title>
					<Typography.Text className={styles.subtitle}>{textEn.editorPage.subTitle}</Typography.Text>
				</Space>
				<Button type="primary" onClick={openSetDataModal}>{textEn.editorPage.setDataButton}</Button>
				<Editor data={data} onChangeLine={handleLineChange} onDeleteLine={handleDeleteLine} />
			</Space>
			<SetDataModal isOpen={isSetDataModalOpen} onOk={handleSetData} onCancel={handleSetDataCancel} />
			{modalContextHolder}
		</Page>
	);
};
