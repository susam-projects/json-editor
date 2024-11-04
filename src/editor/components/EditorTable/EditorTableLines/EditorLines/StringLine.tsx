import React from 'react';
import { ConcreteLineProps } from '../utils/types.ts';
import { useLineValue } from '../utils/useLineValue.ts';
import { EditStringLine } from '../EditMode/EditStringLine.tsx';
import { ReadModeLine } from '../ReadMode/ReadModeLine.tsx';

export const StringLine: React.FC<ConcreteLineProps<string>> = ({ data, onChange, onDelete }) => {
	const {
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useLineValue(data, onChange);

	if (isEdit) {
		return (
			<EditStringLine
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
