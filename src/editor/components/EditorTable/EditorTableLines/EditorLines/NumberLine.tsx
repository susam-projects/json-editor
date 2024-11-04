import React from 'react';
import { ConcreteLineProps } from '../utils/types.ts';
import { useLineValue } from '../utils/useLineValue.ts';
import { EditNumberLine } from '../EditMode/EditNumberLine.tsx';
import { ReadModeLine } from '../ReadMode/ReadModeLine.tsx';

export const NumberLine: React.FC<ConcreteLineProps<number>> = ({ data, onChange, onDelete }) => {
	const {
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useLineValue(data, onChange);

	if (isEdit) {
		return (
			<EditNumberLine
				label={data.label}
				value={data.value}
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
			value={data.value}
			onEditClick={handleEditClick}
		/>
	);
};
