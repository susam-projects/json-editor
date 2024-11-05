import React from 'react';
import {
	EditorDataLine,
	EditorDataLineType, EditorLineValue,
} from '../../../types/EditorData.ts';
import {
	BooleanLine,
	DateLine,
	EmailLine,
	NumberLine,
	StringLine,
	TextLine,
} from '../EditorTableLines';

export type AddLineHandler = (rowIndex: number, prevLineIndex: number) => void;
export type ChangeLineHandler = (rowIndex: number, lineIndex: number, newValue: EditorLineValue) => void;
export type DeleteLineHandler = (rowIndex: number, lineIndex: number) => void;

type EditorLineProps = {
	data: EditorDataLine;
	rowIndex: number;
	lineIndex: number;
	onAddLine: AddLineHandler;
	onChange: ChangeLineHandler;
	onDelete: DeleteLineHandler;
};

const LINE_COMPONENTS = {
	[EditorDataLineType.Unknown]: null,
	[EditorDataLineType.Id]: null,
	[EditorDataLineType.String]: StringLine,
	[EditorDataLineType.Number]: NumberLine,
	[EditorDataLineType.Email]: EmailLine,
	[EditorDataLineType.Date]: DateLine,
	[EditorDataLineType.Boolean]: BooleanLine,
	[EditorDataLineType.Text]: TextLine,
};

export const EditorTableLine: React.FC<EditorLineProps> = React.memo(
	({
		data,
		rowIndex,
		lineIndex,
		onAddLine,
		onChange,
		onDelete,
	}) => {
		const handleAddLine = () => {
			onAddLine(rowIndex, lineIndex);
		};

		const handleChange = (newValue: EditorLineValue) => {
			onChange(rowIndex, lineIndex, newValue);
		};

		const handleDelete = () => {
			onDelete(rowIndex, lineIndex);
		};

		if (!data.isVisible) {
			return null;
		}

		const LineComponent = LINE_COMPONENTS[data.type];
		if (LineComponent) {
			return (
				<LineComponent
					data={data as never} // don't know how to better type it, currently TS "thinks" that LineComponent.data has type "never"
					onAddLine={handleAddLine}
					onChange={handleChange}
					onDelete={handleDelete}
				/>
			);
		}
		return null;
	}
);
