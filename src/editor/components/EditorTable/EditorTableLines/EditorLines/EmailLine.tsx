import React from 'react';
import { ConcreteLineProps } from '../utils/types.ts';
import { useLineValue } from '../utils/useLineValue.ts';
import { EditEmailLine } from '../EditMode/EditEmailLine.tsx';
import { ReadModeLine } from '../ReadMode/ReadModeLine.tsx';

export const EmailLine: React.FC<ConcreteLineProps<string>> = ({ data, onDelete }) => {
	const {
		value,
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useLineValue(data.value);

	if (isEdit) {
		return (
			<EditEmailLine
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
