import React from 'react';
import { DeleteLineHandler, EditorTableLine } from '../EditorTable/EditorTableLine/EditorTableLine.tsx';
import { EditorTableRow } from '../EditorTable/EditorTableRow/EditorTableRow.tsx';
import {
	EditorData,
	EditorDataLine,
	EditorDataRow,
} from '../../types/EditorData.ts';
import { EditorTable } from '../EditorTable/EditorTable/EditorTable.tsx';

type EditorProps = {
  data: EditorData;
	onDeleteLine: DeleteLineHandler;
};

const getRowKey = (row: EditorDataRow, i: number) => {
	return `${row[0]?.value} ${i}`;
};

const getLineKey = (line: EditorDataLine, i: number) => {
	return `${line.value} ${i}`;
};

export const Editor: React.FC<EditorProps> = ({ data, onDeleteLine }) => {
	return (
		<EditorTable>
			{data.map((row, rowIndex) => (
				<EditorTableRow key={getRowKey(row, rowIndex)}>
					{row.map((line, lineIndex) => (
						<EditorTableLine
							key={getLineKey(line, lineIndex)}
							data={line}
							rowIndex={rowIndex}
							lineIndex={lineIndex}
							onDelete={onDeleteLine}
						/>
					))}
				</EditorTableRow>
			))}
		</EditorTable>
	);
};
