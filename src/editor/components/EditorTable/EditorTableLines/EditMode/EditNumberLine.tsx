import React from 'react';
import { EditLineProps } from '../utils/types.ts';
import { useNumberEditValue } from '../utils/useNumberEditValue.ts';
import { EditLineWrapper } from './common/EditLineWrapper.tsx';
import { EditLineLabel } from './common/EditLineLabel.tsx';
import { EditControls } from './common/EditControls.tsx';
import { InputEditor } from './common/InputEditor.tsx';

type EditNumberFieldProps = EditLineProps<number>;

export const EditNumberLine: React.FC<EditNumberFieldProps> = ({
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
	} = useNumberEditValue(value, isEdit, onApply, onCancel);

	return (
		<EditLineWrapper>
			<EditLineLabel label={label} />
			<InputEditor
				inputType="number"
				editValue={editValue}
				onInputChange={handleInputChange}
				onInputKeyDown={handleInputKeyDown}
			/>
			<EditControls onApply={handleApply} onCancel={onCancel} onDelete={onDelete} />
		</EditLineWrapper>
	);
};
