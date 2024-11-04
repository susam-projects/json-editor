import React from 'react';
import { Space } from 'antd';
import { textEn } from '../../../../text';

type RowControlsProps = {
	rowIndex: number;
	onAddFirstLineClick: (rowIndex: number) => void;
	onDeleteRowClick: (rowIndex: number) => void;
}

export const RowControls: React.FC<RowControlsProps> = React.memo(
	({ rowIndex, onAddFirstLineClick, onDeleteRowClick }) => {
		const [isEdit, setIsEdit] = React.useState(false);

		const handAddLineClick = () => {
			onAddFirstLineClick(rowIndex);
		};

		const handleDeleteRowClick = () => {
			onDeleteRowClick(rowIndex);
		};

		const handleEditRowClick = () => {
			setIsEdit(true);
		};

		const handleCancelEditRowClick = () => {
			setIsEdit(false);
		};

		return (
			<tr>
				<td colSpan={3} className="editor-table__row-controls">
					{isEdit ? (
						<Space>
							<button
								type="button"
								className="editor-table__delete-row-button"
								onClick={handleDeleteRowClick}
							>
								{textEn.editorPage.editorTable.deleteRowButton}
							</button>
							<button
								type="button"
								onClick={handAddLineClick}
							>
								{textEn.editorPage.editorTable.addFirstLineButton}
							</button>
							<button
								type="button"
								onClick={handleCancelEditRowClick}
							>
								{textEn.app.cancel}
							</button>
						</Space>
					) : (
						<button
							type="button"
							onClick={handleEditRowClick}
						>
							{textEn.editorPage.editorTable.editRowButton}
						</button>
					)}
				</td>
			</tr>
		);
	}
);
