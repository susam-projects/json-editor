import React from 'react';
import { textEn } from '../../../../text';
import { Space } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { EditFieldProps, useStringFieldEditValue } from './utils.ts';
import dayjs from 'dayjs';
import {
	DATA_DATE_FORMAT,
	DATE_INPUT_FORMAT,
} from '../../../const/dateConst.ts';

type EditDateFieldProps = EditFieldProps<string>

export const EditDateField: React.FC<EditDateFieldProps> = ({
	label,
	value,
	isEdit,
	onApply,
	onCancel,
}) => {
	const formattedValue = dayjs(value, [DATE_INPUT_FORMAT, DATA_DATE_FORMAT]).format(DATE_INPUT_FORMAT);

	const {
		editValue,
		handleInputChange,
		handleInputKeyDown,
		handleApply,
	} = useStringFieldEditValue(formattedValue, isEdit, onApply, onCancel);

	return (
		<tr className="editor-table__field-edit">
			<td>{label}</td>
			<td
				className="editor-table__field__edit-value"
				aria-label={textEn.editorPage.editorTable.lineInputLabel}
			>
				<input
					type="date"
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
