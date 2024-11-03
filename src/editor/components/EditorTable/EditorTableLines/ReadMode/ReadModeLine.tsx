import { EditorLineValue } from '../../../../types/EditorData.ts';
import React from 'react';
import { FormOutlined } from '@ant-design/icons';

interface ReadModeFieldProps {
  label: string;
  value: EditorLineValue;
  onEditClick?: () => void;
}

export const ReadModeLine: React.FC<ReadModeFieldProps> = ({
	label, value, onEditClick,
}) => {
	return (
		<tr className="editor-table__field-read">
			<td>{label}</td>
			<td className="editor-table__field__value">{value}</td>
			<td className="editor-table__field__controls" onClick={onEditClick}>
				<FormOutlined className="editor-table__edit-icon" />
			</td>
		</tr>
	);
};

ReadModeLine.defaultProps = {
	onEditClick: undefined,
};
