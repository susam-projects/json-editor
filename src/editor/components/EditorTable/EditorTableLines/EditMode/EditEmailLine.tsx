import React from 'react';
import { EditLineProps } from '../utils/types.ts';
import { useStringEditValue } from '../utils/useStringEditValue.ts';
import { EditLineWrapper } from './common/EditLineWrapper.tsx';
import { EditLineLabel } from './common/EditLineLabel.tsx';
import { EditControls } from './common/EditControls.tsx';
import { InputEditor } from './common/InputEditor.tsx';

type EditEmailFieldProps = EditLineProps<string>

export const EditEmailLine: React.FC<EditEmailFieldProps> = ({
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
			<InputEditor
				inputType="email"
				editValue={editValue}
				onInputChange={handleInputChange}
				onInputKeyDown={handleInputKeyDown}
			/>
			<EditControls onApply={handleApply} onCancel={onCancel} onDelete={onDelete} />
		</EditLineWrapper>
	);
};
