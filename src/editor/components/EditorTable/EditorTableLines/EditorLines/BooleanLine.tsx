import React from 'react';
import { ConcreteLineProps } from '../utils/types.ts';
import { EditBooleanLine } from '../EditMode/EditBooleanLine.tsx';
import { ReadModeLine } from '../ReadMode/ReadModeLine.tsx';
import { useLineValue } from '../utils/useLineValue.ts';

export const BooleanLine: React.FC<ConcreteLineProps<boolean>> = ({
	data,
	onAddLine,
	onChange,
	onDelete,
}) => {
	const {
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useLineValue(data, onChange);

	if (isEdit) {
		return (
			<EditBooleanLine
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
			value={String(data.value)}
			onAddClick={onAddLine}
			onEditClick={handleEditClick}
		/>
	);
};
