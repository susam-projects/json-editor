import { EditorLineValue } from '../../../../types/EditorData.ts';
import React from 'react';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { Space } from 'antd';

type ReadModeFieldProps = {
	label: string;
	value: EditorLineValue;
	onEditClick: () => void;
	onDeleteClick: () => void;
};

export const ReadModeLine: React.FC<ReadModeFieldProps> = ({
	label, value, onEditClick, onDeleteClick,
}) => {
	return (
		<tr className="editor-table__field-read">
			<td className="editor-table__field__label">{label}</td>
			<td className="editor-table__field__value">{value}</td>
			<td className="editor-table__field__controls">
				<Space>
					<FormOutlined className="editor-table__field__edit-icon" onClick={onEditClick} />
					<DeleteOutlined className="editor-table__field__remove-icon" onClick={onDeleteClick} />
				</Space>
			</td>
		</tr>
	);
};
