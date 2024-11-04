import React from 'react';
import { ConcreteLineProps } from '../utils/types.ts';
import { useLineValue } from '../utils/useLineValue.ts';
import { EditTextLine } from '../EditMode/EditTextLine.tsx';
import { ReadModeLine } from '../ReadMode/ReadModeLine.tsx';

export const TextLine: React.FC<ConcreteLineProps<string>> = ({ data, onDelete }) => {
	const {
		value,
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useLineValue(data.value);

	if (isEdit) {
		return (
			<EditTextLine
				label={data.label}
				value={value}
				isEdit={isEdit}
				onApply={handleApply}
				onCancel={handleCancel}
			/>
		);
	}

	return (
		<ReadModeLine
			label={data.label}
			value={value}
			onEditClick={handleEditClick}
			onDeleteClick={onDelete}
		/>
	);
};
