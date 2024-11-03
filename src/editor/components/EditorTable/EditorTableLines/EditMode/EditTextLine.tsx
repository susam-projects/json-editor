import React from 'react';
import { EditLineProps } from '../utils/types.ts';
import { useStringEditValue } from '../utils/useStringEditValue.ts';
import { EditLineWrapper } from './common/EditLineWrapper.tsx';
import { EditLineLabel } from './common/EditLineLabel.tsx';
import { EditControls } from './common/EditControls.tsx';
import { TextareaEditor } from './common/TextareaEditor.tsx';

type EditTextFieldProps = EditLineProps<string>

export const EditTextLine: React.FC<EditTextFieldProps> = ({
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
	} = useStringEditValue(value, isEdit, onApply, onCancel);

	return (
		<EditLineWrapper>
			<EditLineLabel label={label} />
			<TextareaEditor
				editValue={editValue}
				onInputChange={handleInputChange}
				onInputKeyDown={handleInputKeyDown}
			/>
			<EditControls onApply={handleApply} onCancel={onCancel} />
		</EditLineWrapper>
	);
};
