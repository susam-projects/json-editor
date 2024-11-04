import { EditorLineValue } from '../../../../types/EditorData.ts';
import React from 'react';
import { textEn } from '../../../../../text';

type ReadModeFieldProps = {
	label: string;
	value: EditorLineValue;
	onEditClick: () => void;
};

export const ReadModeLine: React.FC<ReadModeFieldProps> = ({
	label, value, onEditClick,
}) => {
	return (
		<tr className="editor-table__field-read">
			<td className="editor-table__field__label">{label}</td>
			<td className="editor-table__field__value">{value}</td>
			<td className="editor-table__field__controls">
				<button
					type="button"
					className="editor-table__field__edit-button"
					onClick={onEditClick}
				>
					{textEn.editorPage.editorTable.editButton}
				</button>
			</td>
		</tr>
	);
};
