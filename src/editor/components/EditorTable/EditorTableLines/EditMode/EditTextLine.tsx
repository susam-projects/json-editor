import React from 'react';
import { EditLineProps } from '../utils/types.ts';
import { useStringEditValue } from '../utils/useStringEditValue.ts';
import { EditLineWrapper } from './lineWrapper/EditLineWrapper.tsx';
import { EditLineLabel } from './lineLabel/EditLineLabel.tsx';
import { EditControls } from './editControls/EditControls.tsx';
import { TextareaEditor } from './editors/TextareaEditor.tsx';

type EditTextFieldProps = EditLineProps<string>

export const EditTextLine: React.FC<EditTextFieldProps> = ({
	label,
	value,
	isEdit,
	onApply,
	onCancel,
	onDelete,
}) => {
	const {
		editValue,
		handleInputChange,
		handleInputKeyDown,
		handleApply,
	} = useStringEditValue(value, isEdit, onApply, onCancel);

	return (
		<EditLineWrapper>
			<EditLineLabel label={label} />
			<TextareaEditor
				editValue={editValue}
				onInputChange={handleInputChange}
				onInputKeyDown={handleInputKeyDown}
			/>
			<EditControls onApply={handleApply} onCancel={onCancel} onDelete={onDelete} />
		</EditLineWrapper>
	);
};
