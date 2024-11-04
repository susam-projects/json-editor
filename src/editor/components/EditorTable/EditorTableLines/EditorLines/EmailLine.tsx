import React from 'react';
import { ConcreteLineProps } from '../utils/types.ts';
import { useLineValue } from '../utils/useLineValue.ts';
import { EditEmailLine } from '../EditMode/EditEmailLine.tsx';
import { ReadModeLine } from '../ReadMode/ReadModeLine.tsx';

export const EmailLine: React.FC<ConcreteLineProps<string>> = ({
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
			<EditEmailLine
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
			onAddClick={onAddLine}
			onEditClick={handleEditClick}
		/>
	);
};
