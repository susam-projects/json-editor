import { EditorLineValue } from '../../../../types/EditorData.ts';
import React from 'react';
import { textEn } from '../../../../../text';

type ReadModeFieldProps = {
	label: string;
	value: EditorLineValue;
	onAddClick: () => void;
	onEditClick: () => void;
};

export const ReadModeLine: React.FC<ReadModeFieldProps> = ({
	label,
	value,
	onAddClick,
	onEditClick,
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
					{textEn.editorPage.editorTable.editLineButton}
				</button>
				<button
					type="button"
					className="editor-table__field__add-line-button"
					onClick={onAddClick}
				>
					{textEn.editorPage.editorTable.addLineButton}
				</button>
			</td>
		</tr>
	);
};
