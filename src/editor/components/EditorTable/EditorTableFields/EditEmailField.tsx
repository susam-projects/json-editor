import React from 'react';
import { textEn } from '../../../../text';
import { Space } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { EditFieldProps, useStringFieldEditValue } from './utils.ts';

type EditEmailFieldProps = EditFieldProps<string>

export const EditEmailField: React.FC<EditEmailFieldProps> = ({
	label,
	value,
	isEdit,
	onApply,
	onCancel,
}) => {
	const {
		editValue,
		handleInputChange,
		handleInputKeyDown,
		handleApply,
	} = useStringFieldEditValue(value, isEdit, onApply, onCancel);

	return (
		<tr className="editor-table__field-edit">
			<td>{label}</td>
			<td
				className="editor-table__field__edit-value"
				aria-label={textEn.editorPage.editorTable.lineInputLabel}
			>
				<input
					type="email"
					value={editValue}
					onChange={handleInputChange}
					onKeyDown={handleInputKeyDown}
				/>
			</td>
			<td className="editor-table__field__controls">
				<Space>
					<CheckOutlined
						className="editor-table__field__apply-icon"
						onClick={handleApply}
					/>
					<CloseOutlined
						className="editor-table__field__cancel-icon"
						onClick={onCancel}
					/>
				</Space>
			</td>
		</tr>
	);
};
