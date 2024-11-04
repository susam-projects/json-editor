import React from 'react';
import { ConcreteLineProps } from '../utils/types.ts';
import { useLineValue } from '../utils/useLineValue.ts';
import dayjs from 'dayjs';
import {
	DATA_DATE_FORMAT,
	DATE_INPUT_FORMAT, DATE_READ_FORMAT,
} from '../../../../const/dateConst.ts';
import { EditDateLine } from '../EditMode/EditDateLine.tsx';
import { ReadModeLine } from '../ReadMode/ReadModeLine.tsx';

export const DateLine: React.FC<ConcreteLineProps<string>> = ({ data, onDelete }) => {
	const {
		value,
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useLineValue(data.value);

	const formattedValue = value && dayjs(value, [DATA_DATE_FORMAT, DATE_INPUT_FORMAT]).format(DATE_READ_FORMAT);

	if (isEdit) {
		return (
			<EditDateLine
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
			value={formattedValue}
			onEditClick={handleEditClick}
		/>
	);
};
