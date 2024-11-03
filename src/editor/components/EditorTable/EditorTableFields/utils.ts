import React from 'react';
import { RadioChangeEvent } from 'antd';

export interface EditFieldProps<T> {
  label: string;
  value: T;
  isEdit: boolean;
  onApply: (newValue: T) => void;
  onCancel: () => void;
}

export const useFieldValue = <T>(defaultValue: T) => {
	const [value, setValue] = React.useState(defaultValue);
	const [isEdit, setIsEdit] = React.useState(false);

	const handleEditClick = () => {
		setIsEdit(true);
	};

	const handleApply = (newValue: T) => {
		setValue(newValue);
		setIsEdit(false);
	};

	const handleCancel = () => {
		setIsEdit(false);
	};

	return {
		value,
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	};
};

type StringInputElement = HTMLInputElement | HTMLTextAreaElement;

export const useStringFieldEditValue = (value: string, isEdit: boolean, onApply: (value: string) => void, onCancel: () => void) => {
	const [editValue, setEditValue] = React.useState('');

	React.useEffect(() => {
		setEditValue(value);
	}, [isEdit, value]);

	const handleInputChange: React.ChangeEventHandler<StringInputElement> = (event) => {
		setEditValue(event.target.value);
	};

	const handleInputKeyDown: React.KeyboardEventHandler<StringInputElement> = (event) => {
		if (event.key === 'Enter') {
			handleApply();
		}
		if (event.key === 'Escape') {
			onCancel();
		}
	};

	const handleApply = () => {
		onApply(editValue);
	};

	return {
		editValue,
		handleInputChange,
		handleInputKeyDown,
		handleApply,
	};
};

export const useNumberFieldEditValue = (value: number, isEdit: boolean, onApply: (value: number) => void, onCancel: () => void) => {
	const [editValue, setEditValue] = React.useState('');

	React.useEffect(() => {
		setEditValue(String(value));
	}, [isEdit, value]);

	const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setEditValue(event.target.value);
	};

	const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (event.key === 'Enter') {
			handleApply();
		}
		if (event.key === 'Escape') {
			onCancel();
		}
	};

	const handleApply = () => {
		const parsedValue = Number.parseFloat(editValue);
		if (!Number.isNaN(parsedValue)) {
			onApply(parsedValue);
		} else {
			onCancel();
		}
	};

	return {
		editValue,
		handleInputChange,
		handleInputKeyDown,
		handleApply,
	};
};

export const useBooleanFieldEditValue = (value: boolean, isEdit: boolean, onApply: (value: boolean) => void) => {
	const [editValue, setEditValue] = React.useState(String(value));

	React.useEffect(() => {
		setEditValue(String(value));
	}, [isEdit, value]);

	const handleInputChange = (event: RadioChangeEvent) => {
		setEditValue(event.target.value);
	};

	const handleApply = () => {
		onApply(editValue === 'true');
	};

	return {
		editValue,
		handleInputChange,
		handleApply,
	};
};
