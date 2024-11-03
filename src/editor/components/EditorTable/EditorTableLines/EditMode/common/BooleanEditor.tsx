import { RadioGroupOnChange } from '../../utils/useBooleanEditValue.ts';
import React from 'react';
import { textEn } from '../../../../../../text';
import { Radio } from 'antd';

interface BooleanEditorProps {
  editValue: string;
  onInputChange: RadioGroupOnChange;
}

export const BooleanEditor: React.FC<BooleanEditorProps> = ({ editValue, onInputChange }) => {
	return (
		<td
			className="editor-table__field__edit-value"
			aria-label={textEn.editorPage.editorTable.lineInputLabel}
		>
			<Radio.Group value={editValue} onChange={onInputChange}>
				<Radio value="true">{textEn.editorPage.editorTable.booleanTrue}</Radio>
				<Radio value="false">{textEn.editorPage.editorTable.booleanFalse}</Radio>
			</Radio.Group>
		</td>
	);
};
