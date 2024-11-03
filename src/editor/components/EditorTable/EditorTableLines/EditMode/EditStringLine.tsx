import React from 'react';
import { EditLineProps } from '../utils/types.ts';
import { useStringEditValue } from '../utils/useStringEditValue.ts';
import { EditLineWrapper } from './common/EditLineWrapper.tsx';
import { EditLineLabel } from './common/EditLineLabel.tsx';
import { EditControls } from './common/EditControls.tsx';
import { InputEditor } from './common/InputEditor.tsx';

type EditStringFieldProps = EditLineProps<string>

export const EditStringLine: React.FC<EditStringFieldProps> = ({
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
			<InputEditor
				inputType="text"
				editValue={editValue}
				onInputChange={handleInputChange}
				onInputKeyDown={handleInputKeyDown}
			/>
			<EditControls onApply={handleApply} onCancel={onCancel} />
		</EditLineWrapper>
	);
};
