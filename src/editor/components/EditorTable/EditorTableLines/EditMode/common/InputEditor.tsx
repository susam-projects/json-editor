import React, { HTMLInputTypeAttribute } from 'react';
import { textEn } from '../../../../../../text';

interface InputEditorProps {
  inputType: HTMLInputTypeAttribute;
  editValue: string;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onInputKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

export const InputEditor: React.FC<InputEditorProps> = ({
	inputType, editValue, onInputKeyDown, onInputChange,
}) => {
	return (
		<td
			className="editor-table__field__edit-value"
			aria-label={textEn.editorPage.editorTable.lineInputLabel}
		>
			<input type={inputType} value={editValue} onChange={onInputChange} onKeyDown={onInputKeyDown} />
		</td>
	);
};
