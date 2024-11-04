import React from 'react';
import {
	AddLineHandler,
	ChangeLineHandler,
	DeleteLineHandler,
	EditorTableLine,
} from '../EditorTable/EditorTableLine/EditorTableLine.tsx';
import { EditorTableRow } from '../EditorTable/EditorTableRow/EditorTableRow.tsx';
import {
	EditorData,
	EditorDataLine,
	EditorDataRow,
} from '../../types/EditorData.ts';
import { EditorTable } from '../EditorTable/EditorTable/EditorTable.tsx';
import { AddRowButton } from '../EditorTable/AddRowButton/AddRowButton.tsx';
import { RowControls } from '../EditorTable/RowControls/RowControls.tsx';

export type AddRowHandler = (prevRowIndex: number) => void;

export type DeleteRowHandler = (rowIndex: number) => void;

type EditorProps = {
	data: EditorData;
	onAddRow: AddRowHandler;
	onDeleteRow: DeleteRowHandler;
	onAddLine: AddLineHandler;
	onChangeLine: ChangeLineHandler;
	onDeleteLine: DeleteLineHandler;
};

const getRowKey = (row: EditorDataRow, rowIndex: number) => {
	return `${row[0]?.value} ${rowIndex}`;
};

const getLineKey = (line: EditorDataLine, rowIndex: number, lineIndex: number) => {
	return `${rowIndex} ${lineIndex} ${line.value}`;
};

export const Editor: React.FC<EditorProps> = React.memo(
	({
		data,
		onAddRow,
		onDeleteRow,
		onAddLine,
		onChangeLine,
		onDeleteLine,
	}) => {
		const handleAddFirstLine = React.useCallback((rowIndex: number) => {
			onAddLine(rowIndex, -1);
		}, [onAddLine]);

		return (
			<EditorTable>
				<AddRowButton rowIndex={-1} onClick={onAddRow} />
				{data.map((row, rowIndex) => (
					<React.Fragment key={getRowKey(row, rowIndex)}>
						<RowControls
							rowIndex={rowIndex}
							onAddFirstLineClick={handleAddFirstLine}
							onDeleteRowClick={onDeleteRow}
						/>
						<EditorTableRow>
							{row.map((line, lineIndex) => (
								<EditorTableLine
									key={getLineKey(line, rowIndex, lineIndex)}
									data={line}
									rowIndex={rowIndex}
									lineIndex={lineIndex}
									onAddLine={onAddLine}
									onChange={onChangeLine}
									onDelete={onDeleteLine}
								/>
							))}
						</EditorTableRow>
						<AddRowButton
							rowIndex={rowIndex}
							onClick={onAddRow}
						/>
					</React.Fragment>
				))}
			</EditorTable>
		);
	}
);
