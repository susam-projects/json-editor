import React from 'react';

export const useLineValue = <T>(defaultValue: T) => {
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
