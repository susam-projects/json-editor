import React from 'react';
import {
	AddRowHandler,
	DeleteRowHandler,
	Editor,
} from '../components/Editor/Editor.tsx';
import {
	Button,
	Modal,
	Space,
	Typography,
} from 'antd';
import { Page } from '../../layout';
import { useStyles } from './EditorPage.styles.ts';
import { textEn } from '../../text';
import { SetDataModal } from '../components/SetDataModal/SetDataModal.tsx';
import { objectsToEditorData } from '../service/dataMapper.service.ts';
import { confirmDeleteLine, confirmDeleteRow } from '../components/Confirm/Confirm.ts';
import {
	AddLineHandler,
	ChangeLineHandler,
	DeleteLineHandler,
} from '../components/EditorTable/EditorTableLine/EditorTableLine.tsx';
import {
	addLine,
	addRow,
	deleteLine,
	deleteRow,
	updateLineValue,
} from '../service/dataUpdater.service.ts';
import { EditorData } from '../types/EditorData.ts';
import { useModal } from '../../utils/useModal.ts';
import { AddLineModal, AddLineModalOkHandler } from '../components/AddLineModal/AddLineModal.tsx';
import { SetState } from '../../utils/utilityTypes.ts';
import jsonSample from '../data/json-1000.json';

const useJsonData = () => {
	const [data, setData] = React.useState(objectsToEditorData(jsonSample));

	const {
		isOpen: isSetDataModalOpen,
		open: openSetDataModal,
		close: closeSetDataModal,
	} = useModal();

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

	return {
		data,
		setData,
		isSetDataModalOpen,
		openSetDataModal,
		handleSetDataCancel,
		handleSetData,
	};
};

const useAddLineModal = (setData: SetState<EditorData>) => {
	const [rowIndex, setRowIndex] = React.useState(-1);
	const [prevLineIndex, setPrevLineIndex] = React.useState(-1);

	const {
		isOpen: isAddLineModalOpen,
		open,
		close,
	} = useModal();

	const handleAddModalCancel = () => {
		close();
	};

	const handleAddModalOk: AddLineModalOkHandler = (data) => {
		setData((prevData) => {
			return addLine(prevData, rowIndex, prevLineIndex, data);
		});
		close();
	};

	const openAddLineModal = React.useCallback((rowIndex: number, prevLineIndex: number) => {
		setRowIndex(rowIndex);
		setPrevLineIndex(prevLineIndex);
		open();
	}, [open]);

	return {
		setRowIndex,
		setPrevLineIndex,
		handleAddModalOk,
		handleAddModalCancel,
		isAddLineModalOpen,
		openAddLineModal,
	};
};

type OpenAddLineModal = ReturnType<typeof useAddLineModal>['openAddLineModal'];

const useJsonEditor = (setData: SetState<EditorData>, openAddLineModal: OpenAddLineModal) => {
	const [modal, modalContextHolder] = Modal.useModal();

	const handleAddRow = React.useCallback<AddRowHandler>((prevRowIndex) => {
		setData((prevData) => {
			return addRow(prevData, prevRowIndex);
		});
	}, [setData]);

	const handleDeleteRow = React.useCallback<DeleteRowHandler>((rowIndex) => {
		confirmDeleteRow(modal, {
			rowIndex,
			onOk: () => {
				setData((prevData) => {
					return deleteRow(prevData, rowIndex);
				});
			},
		});
	}, [modal, setData]);

	const handleAddLine = React.useCallback<AddLineHandler>((rowIndex, prevLineIndex) => {
		openAddLineModal(rowIndex, prevLineIndex);
	}, [openAddLineModal]);

	const handleLineChange = React.useCallback<ChangeLineHandler>((rowIndex, lineIndex, newValue) => {
		setData((prevData) => {
			return updateLineValue(prevData, rowIndex, lineIndex, newValue);
		});
	}, [setData]);

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
	}, [modal, setData]);

	return {
		handleAddRow,
		handleDeleteRow,
		handleAddLine,
		handleLineChange,
		handleDeleteLine,
		modalContextHolder,
	};
};

export const EditorPage: React.FC = () => {
	const { styles } = useStyles();

	const {
		data,
		setData,
		isSetDataModalOpen,
		openSetDataModal,
		handleSetDataCancel,
		handleSetData,
	} = useJsonData();

	const {
		isAddLineModalOpen,
		handleAddModalCancel,
		handleAddModalOk,
		openAddLineModal,
	} = useAddLineModal(setData);

	const {
		handleAddRow,
		handleDeleteRow,
		handleAddLine,
		handleLineChange,
		handleDeleteLine,
		modalContextHolder,
	} = useJsonEditor(setData, openAddLineModal);

	return (
		<Page>
			<Space direction="vertical" size="large" className={styles.verticalSpace}>
				<Space direction="vertical" size="small" className={styles.verticalSpace}>
					<Typography.Title className={styles.title}>{textEn.editorPage.title}</Typography.Title>
					<Typography.Text className={styles.subtitle}>{textEn.editorPage.subTitle}</Typography.Text>
				</Space>
				<Button type="primary" onClick={openSetDataModal}>{textEn.editorPage.setDataButton}</Button>
				<Editor
					data={data}
					onAddRow={handleAddRow}
					onDeleteRow={handleDeleteRow}
					onAddLine={handleAddLine}
					onChangeLine={handleLineChange}
					onDeleteLine={handleDeleteLine}
				/>
			</Space>
			<SetDataModal
				isOpen={isSetDataModalOpen}
				onOk={handleSetData}
				onCancel={handleSetDataCancel}
			/>
			<AddLineModal
				isOpen={isAddLineModalOpen}
				onOk={handleAddModalOk}
				onCancel={handleAddModalCancel}
			/>
			{modalContextHolder}
		</Page>
	);
};
