import React from 'react';
import { textEn } from '../../../../text';
import { Space, Radio } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
	EditFieldProps,
	useBooleanFieldEditValue,
} from './utils.ts';

type EditBooleanFieldProps = EditFieldProps<boolean>

export const EditBooleanField: React.FC<EditBooleanFieldProps> = ({
	label,
	value,
	isEdit,
	onApply,
	onCancel,
}) => {
	const {
		editValue,
		handleInputChange,
		handleApply,
	} = useBooleanFieldEditValue(value, isEdit, onApply);

	return (
		<tr className="editor-table__field-edit">
			<td>{label}</td>
			<td
				className="editor-table__field__edit-value"
				aria-label={textEn.editorPage.editorTable.lineInputLabel}
			>
				<Radio.Group value={editValue} onChange={handleInputChange}>
					<Radio value="true">{textEn.editorPage.editorTable.booleanTrue}</Radio>
					<Radio value="false">{textEn.editorPage.editorTable.booleanFalse}</Radio>
				</Radio.Group>
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
