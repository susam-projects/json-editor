import React from 'react';
import { ConcreteLineProps } from '../utils/types.ts';
import { useLineValue } from '../utils/useLineValue.ts';
import dayjs from 'dayjs';
import {
	DATA_DATE_FORMAT,
	DATE_INPUT_FORMAT,
	DATE_READ_FORMAT,
} from '../../../../const/dateConst.ts';
import { EditDateLine } from '../EditMode/EditDateLine.tsx';
import { ReadModeLine } from '../ReadMode/ReadModeLine.tsx';

export const DateLine: React.FC<ConcreteLineProps<string>> = ({ data, onChange, onDelete }) => {
	const {
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useLineValue(data, onChange);

	if (isEdit) {
		return (
			<EditDateLine
				label={data.label}
				value={data.value}
				isEdit={isEdit}
				onApply={handleApply}
				onCancel={handleCancel}
				onDelete={onDelete}
			/>
		);
	}

	const formattedValue = data.value && dayjs(data.value, [DATA_DATE_FORMAT, DATE_INPUT_FORMAT]).format(DATE_READ_FORMAT);
	return (
		<ReadModeLine
			label={data.label}
			value={formattedValue}
			onEditClick={handleEditClick}
		/>
	);
};
