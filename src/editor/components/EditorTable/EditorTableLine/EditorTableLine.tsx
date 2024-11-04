import React from 'react';
import {
	EditorDataLine,
	EditorDataLineType,
} from '../../../types/EditorData.ts';
import {
	BooleanLine,
	DateLine,
	EmailLine,
	NumberLine,
	StringLine,
	TextLine,
} from '../EditorTableLines';

export type DeleteLineHandler = (rowIndex: number, lineIndex: number) => void;

type EditorLineProps = {
	data: EditorDataLine
	rowIndex: number;
	lineIndex: number;
	onDelete: DeleteLineHandler;
};

export const EditorTableLine: React.FC<EditorLineProps> = React.memo(
	({
		data,
		rowIndex,
		lineIndex,
		onDelete,
	}) => {
		const handleDelete = () => {
			onDelete(rowIndex, lineIndex);
		};

		if (!data.isVisible) {
			return null;
		}

		// unlike a map, switch allows to specify exact data types
		switch (data.type) {
		case EditorDataLineType.String:
			return <StringLine data={data as EditorDataLine<string>} onDelete={handleDelete} />;

		case EditorDataLineType.Number:
			return <NumberLine data={data as EditorDataLine<number>} onDelete={handleDelete} />;

		case EditorDataLineType.Email:
			return <EmailLine data={data as EditorDataLine<string>} onDelete={handleDelete} />;

		case EditorDataLineType.Date:
			return <DateLine data={data as EditorDataLine<string>} onDelete={handleDelete} />;

		case EditorDataLineType.Boolean:
			return <BooleanLine data={data as EditorDataLine<boolean>} onDelete={handleDelete} />;

		case EditorDataLineType.Text:
			return <TextLine data={data as EditorDataLine<string>} onDelete={handleDelete} />;

		case EditorDataLineType.Id:
		case EditorDataLineType.Unknown:
		default:
			return null;
		}
	}
);
