import React from 'react';
import { ConcreteLineProps } from '../utils/types.ts';
import { useLineValue } from '../utils/useLineValue.ts';
import { EditNumberLine } from '../EditMode/EditNumberLine.tsx';
import { ReadModeLine } from '../ReadMode/ReadModeLine.tsx';

export const NumberLine: React.FC<ConcreteLineProps<number>> = ({ data, onDelete }) => {
	const {
		value,
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useLineValue(data.value);

	if (isEdit) {
		return (
			<EditNumberLine
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
