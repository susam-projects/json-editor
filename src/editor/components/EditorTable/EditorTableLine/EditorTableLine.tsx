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
	data: EditorDataLine
	rowIndex: number;
	lineIndex: number;
	onAddLine: AddLineHandler;
	onChange: ChangeLineHandler;
	onDelete: DeleteLineHandler;
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

		// unlike a map, switch allows to specify exact data types
		switch (data.type) {
		case EditorDataLineType.String:
			return (
				<StringLine
					data={data as EditorDataLine<string>}
					onAddLine={handleAddLine}
					onChange={handleChange}
					onDelete={handleDelete}
				/>
			);

		case EditorDataLineType.Number:
			return (
				<NumberLine
					data={data as EditorDataLine<number>}
					onAddLine={handleAddLine}
					onChange={handleChange}
					onDelete={handleDelete}
				/>
			);

		case EditorDataLineType.Email:
			return (
				<EmailLine
					data={data as EditorDataLine<string>}
					onAddLine={handleAddLine}
					onChange={handleChange}
					onDelete={handleDelete}
				/>
			);

		case EditorDataLineType.Date:
			return (
				<DateLine
					data={data as EditorDataLine<string>}
					onAddLine={handleAddLine}
					onChange={handleChange}
					onDelete={handleDelete}
				/>
			);

		case EditorDataLineType.Boolean:
			return (
				<BooleanLine
					data={data as EditorDataLine<boolean>}
					onAddLine={handleAddLine}
					onChange={handleChange}
					onDelete={handleDelete}
				/>
			);

		case EditorDataLineType.Text:
			return (
				<TextLine
					data={data as EditorDataLine<string>}
					onAddLine={handleAddLine}
					onChange={handleChange}
					onDelete={handleDelete}
				/>
			);

		case EditorDataLineType.Id:
		case EditorDataLineType.Unknown:
		default:
			return null;
		}
	}
);
