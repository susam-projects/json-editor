import React from 'react';

type EditLineLabelProps = {
  label: string;
};

export const EditLineLabel: React.FC<EditLineLabelProps> = ({ label }) => {
	return <td className="editor-table__field__label">{label}</td>;
};
