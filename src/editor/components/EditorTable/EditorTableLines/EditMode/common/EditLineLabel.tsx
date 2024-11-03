import React from 'react';

interface EditLineLabelProps {
  label: string;
}
export const EditLineLabel: React.FC<EditLineLabelProps> = ({ label }) => {
	return <td>{label}</td>;
};
