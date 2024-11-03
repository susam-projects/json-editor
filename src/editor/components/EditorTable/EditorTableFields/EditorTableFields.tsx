import { EditorDataLine, EditorLineValue } from '../../../types/EditorData.ts';
import React from 'react';
import dayjs from 'dayjs';
import { ReadModeField } from './ReadModeField.tsx';
import { EditStringField } from './EditStringField.tsx';
import { useFieldValue } from './utils.ts';
import { EditTextField } from './EditTextField.tsx';
import { EditEmailField } from './EditEmailField.tsx';
import { EditNumberField } from './EditNumberField.tsx';
import { EditDateField } from './EditDateField.tsx';
import {
	DATA_DATE_FORMAT,
	DATE_INPUT_FORMAT,
	DATE_READ_FORMAT,
} from '../../../const/dateConst.ts';
import { EditBooleanField } from './EditBooleanField.tsx';

interface ConcreteLineProps<T extends EditorLineValue = EditorLineValue> {
  data: EditorDataLine<T>
}

export const StringField: React.FC<ConcreteLineProps<string>> = ({ data }) => {
	const {
		value,
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useFieldValue(data.value);

	if (isEdit) {
		return (
			<EditStringField
				label={data.label}
				value={value}
				isEdit={isEdit}
				onApply={handleApply}
				onCancel={handleCancel}
			/>
		);
	}

	return (
		<ReadModeField
			label={data.label}
			value={value}
			onEditClick={handleEditClick}
		/>
	);
};

export const TextField: React.FC<ConcreteLineProps<string>> = ({ data }) => {
	const {
		value,
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useFieldValue(data.value);

	if (isEdit) {
		return (
			<EditTextField
				label={data.label}
				value={value}
				isEdit={isEdit}
				onApply={handleApply}
				onCancel={handleCancel}
			/>
		);
	}

	return (
		<ReadModeField
			label={data.label}
			value={value}
			onEditClick={handleEditClick}
		/>
	);
};

export const EmailField: React.FC<ConcreteLineProps<string>> = ({ data }) => {
	const {
		value,
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useFieldValue(data.value);

	if (isEdit) {
		return (
			<EditEmailField
				label={data.label}
				value={value}
				isEdit={isEdit}
				onApply={handleApply}
				onCancel={handleCancel}
			/>
		);
	}

	return (
		<ReadModeField
			label={data.label}
			value={value}
			onEditClick={handleEditClick}
		/>
	);
};

export const DateField: React.FC<ConcreteLineProps<string>> = ({ data }) => {
	const {
		value,
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useFieldValue(data.value);

	const formattedValue = value && dayjs(value, [DATA_DATE_FORMAT, DATE_INPUT_FORMAT]).format(DATE_READ_FORMAT);

	if (isEdit) {
		return (
			<EditDateField
				label={data.label}
				value={value}
				isEdit={isEdit}
				onApply={handleApply}
				onCancel={handleCancel}
			/>
		);
	}

	return (
		<ReadModeField
			label={data.label}
			value={formattedValue}
			onEditClick={handleEditClick}
		/>
	);
};

export const NumberField: React.FC<ConcreteLineProps<number>> = ({ data }) => {
	const {
		value,
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useFieldValue(data.value);

	if (isEdit) {
		return (
			<EditNumberField
				label={data.label}
				value={value}
				isEdit={isEdit}
				onApply={handleApply}
				onCancel={handleCancel}
			/>
		);
	}

	return (
		<ReadModeField
			label={data.label}
			value={value}
			onEditClick={handleEditClick}
		/>
	);
};

export const BooleanField: React.FC<ConcreteLineProps<boolean>> = ({ data }) => {
	const {
		value,
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useFieldValue(data.value);

	if (isEdit) {
		return (
			<EditBooleanField
				label={data.label}
				value={value}
				isEdit={isEdit}
				onApply={handleApply}
				onCancel={handleCancel}
			/>
		);
	}

	return (
		<ReadModeField
			label={data.label}
			value={String(value)}
			onEditClick={handleEditClick}
		/>
	);
};
