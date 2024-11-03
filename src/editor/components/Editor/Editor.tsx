import React from 'react';
import { EditorTableLine } from '../EditorTable/EditorTableLine/EditorTableLine.tsx';
import { EditorTableRow } from '../EditorTable/EditorTableRow/EditorTableRow.tsx';
import {
	EditorData,
	EditorDataLine,
	EditorDataRow,
} from '../../types/EditorData.ts';
import { EditorTable } from '../EditorTable/EditorTable/EditorTable.tsx';

interface EditorProps {
  data: EditorData;
}

const getRowKey = (row: EditorDataRow, i: number) => {
	return `${row[0]?.value} ${i}`;
};

const getLineKey = (line: EditorDataLine, i: number) => {
	return `${line.value} ${i}`;
};

export const Editor: React.FC<EditorProps> = ({ data }) => {
	return (
		<EditorTable>
			{data.map((row, i) => (
				<EditorTableRow key={getRowKey(row, i)}>
					{row.map(line => (
						<EditorTableLine key={getLineKey(line, i)} data={line} />
					))}
				</EditorTableRow>
			))}
		</EditorTable>
	);
};
