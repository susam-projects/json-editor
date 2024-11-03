import React from 'react';
import { textEn } from '../../../../../../text';

type TextareaEditorProps = {
  editValue: string;
  onInputChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onInputKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement>;
};

export const TextareaEditor: React.FC<TextareaEditorProps> = ({
	editValue, onInputKeyDown, onInputChange,
}) => {
	return (
		<td
			className="editor-table__field__edit-value"
			aria-label={textEn.editorPage.editorTable.lineInputLabel}
		>
			<textarea value={editValue} onChange={onInputChange} onKeyDown={onInputKeyDown} />
		</td>
	);
};
