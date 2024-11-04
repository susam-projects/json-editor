import React from 'react';
import { EditLineProps } from '../utils/types.ts';
import {
	useBooleanEditValue,
} from '../utils/useBooleanEditValue.ts';
import { EditControls } from './common/EditControls.tsx';
import { EditLineWrapper } from './common/EditLineWrapper.tsx';
import { EditLineLabel } from './common/EditLineLabel.tsx';
import { BooleanEditor } from './common/BooleanEditor.tsx';

type EditBooleanLineProps = EditLineProps<boolean>

export const EditBooleanLine: React.FC<EditBooleanLineProps> = ({
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
		handleApply,
	} = useBooleanEditValue(value, isEdit, onApply);

	return (
		<EditLineWrapper>
			<EditLineLabel label={label} />
			<BooleanEditor editValue={editValue} onInputChange={handleInputChange} />
			<EditControls onApply={handleApply} onCancel={onCancel} onDelete={onDelete} />
		</EditLineWrapper>
	);
};
