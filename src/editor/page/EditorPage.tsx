import React from 'react';
import { Editor, ViewType } from '../components/Editor/Editor.tsx';
import {
	Button, Segmented, Space, Typography,
} from 'antd';
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

type TSegmentedOptions = React.ComponentProps<typeof Segmented<ViewType>>['options'];
type TSegmentedOnChange = React.ComponentProps<typeof Segmented<ViewType>>['onChange'];

const VIEW_TYPE_OPTIONS: TSegmentedOptions = [
	{ label: 'Collapse view', value: ViewType.Collapse },
	{ label: 'Table view', value: ViewType.Table },
];

const useEditorViewType = () => {
	const [viewType, setViewType] = React.useState(ViewType.Collapse);

	const handleViewTypeChange: TSegmentedOnChange = (value) => {
		setViewType(value);
	};

	return {
		viewType,
		handleViewTypeChange,
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

	const {
		viewType,
		handleViewTypeChange,
	} = useEditorViewType();

	return (
		<Page>
			<Space direction="vertical" size="large" className={styles.wrapper}>
				<Typography.Title className={styles.title}>{textEn.editorPage.title}</Typography.Title>
				<Space size="large">
					<Button type="primary" onClick={openSetDataModal}>{textEn.editorPage.setDataButton}</Button>
					<Segmented value={viewType} onChange={handleViewTypeChange} options={VIEW_TYPE_OPTIONS} />
				</Space>
				<Editor view={viewType} />
			</Space>
			<SetDataModal isOpen={isSetDataModalOpen} onOk={handleSetData} onCancel={handleSetDataCancel} />
		</Page>
	);
};
