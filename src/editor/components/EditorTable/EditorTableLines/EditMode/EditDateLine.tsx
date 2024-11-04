import React from 'react';
import dayjs from 'dayjs';
import {
	DATA_DATE_FORMAT,
	DATE_INPUT_FORMAT,
} from '../../../../const/dateConst.ts';
import { EditLineProps } from '../utils/types.ts';
import { useStringEditValue } from '../utils/useStringEditValue.ts';
import { EditLineWrapper } from './common/EditLineWrapper.tsx';
import { EditLineLabel } from './common/EditLineLabel.tsx';
import { EditControls } from './common/EditControls.tsx';
import { InputEditor } from './common/InputEditor.tsx';

type EditDateFieldProps = EditLineProps<string>;

export const EditDateLine: React.FC<EditDateFieldProps> = ({
	label,
	value,
	isEdit,
	onApply,
	onCancel,
	onDelete,
}) => {
	const formattedValue = dayjs(value, [DATE_INPUT_FORMAT, DATA_DATE_FORMAT]).format(DATE_INPUT_FORMAT);

	const {
		editValue,
		handleInputChange,
		handleInputKeyDown,
		handleApply,
	} = useStringEditValue(formattedValue, isEdit, onApply, onCancel);

	return (
		<EditLineWrapper>
			<EditLineLabel label={label} />
			<InputEditor
				inputType="date"
				editValue={editValue}
				onInputChange={handleInputChange}
				onInputKeyDown={handleInputKeyDown}
			/>
			<EditControls onApply={handleApply} onCancel={onCancel} onDelete={onDelete} />
		</EditLineWrapper>
	);
};
