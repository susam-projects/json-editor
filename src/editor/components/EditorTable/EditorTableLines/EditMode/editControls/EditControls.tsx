import React from 'react';
import { Space } from 'antd';
import { textEn } from '../../../../../../text';

type EditControlsProps = {
  onApply: () => void;
  onCancel: () => void;
	onDelete: () => void;
};

export const EditControls: React.FC<EditControlsProps> = ({ onApply, onCancel, onDelete }) => {
	return (
		<td className="editor-table__field__controls">
			<Space>
				<button
					type="button"
					className="editor-table__field__delete-button"
					onClick={onDelete}
				>
					{textEn.editorPage.editorTable.deleteButton}
				</button>
				<button
					type="button"
					className="editor-table__field__apply-button"
					onClick={onApply}
				>
					{textEn.app.ok}
				</button>
				<button
					type="button"
					className="editor-table__field__cancel-button"
					onClick={onCancel}
				>
					{textEn.app.cancel}
				</button>
			</Space>
		</td>
	);
};
