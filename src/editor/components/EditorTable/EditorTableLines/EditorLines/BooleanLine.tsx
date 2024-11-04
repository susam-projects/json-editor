import React from 'react';
import { ConcreteLineProps } from '../utils/types.ts';
import { EditBooleanLine } from '../EditMode/EditBooleanLine.tsx';
import { ReadModeLine } from '../ReadMode/ReadModeLine.tsx';
import { useLineValue } from '../utils/useLineValue.ts';

export const BooleanLine: React.FC<ConcreteLineProps<boolean>> = ({ data, onDelete }) => {
	const {
		value,
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useLineValue(data.value);

	if (isEdit) {
		return (
			<EditBooleanLine
				label={data.label}
				value={value}
				isEdit={isEdit}
				onApply={handleApply}
				onCancel={handleCancel}
				onDelete={onDelete}
			/>
		);
	}

	return (
		<ReadModeLine
			label={data.label}
			value={String(value)}
			onEditClick={handleEditClick}
		/>
	);
};
