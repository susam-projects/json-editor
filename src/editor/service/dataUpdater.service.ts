import {
	EditorData, EditorDataLine, EditorDataRow, EditorLineValue,
} from '../types/EditorData.ts';
import { AddLineData } from '../components/AddLineModal/AddLineModal.tsx';

/**
 * adds new row after the given one
 */
export const addRow = (prevData: EditorData, rowIndex: number): EditorData => {
	const newRow: EditorDataRow = [];

	if (rowIndex < 0) {
		return [newRow, ...prevData];
	}

	return prevData.reduce<EditorData>((result, row, currentRowIndex) => {
		result.push(row);
		if (currentRowIndex === rowIndex) {
			result.push(newRow);
		}
		return result;
	}, []);
};

/**
 * creates new data without the row
 */
export const deleteRow = (prevData: EditorData, rowIndex: number): EditorData => {
	return prevData.filter((_, currentRowIndex) => currentRowIndex !== rowIndex);
};

/**
 * adds new line after the given one
 * keeps the rest of the rows and lines the same
 */
export const addLine = (
	prevData: EditorData,
	rowIndex: number,
	lineIndex: number,
	lineData: AddLineData,
): EditorData => {
	const newLine: EditorDataLine = {
		...lineData,
		isVisible: true,
	};

	const updateRow = (row: EditorDataRow, lineIndex: number, newLine: EditorDataLine): EditorDataRow => {
		if (lineIndex < 0) {
			return [newLine, ...row];
		}

		return row.reduce<EditorDataRow>((result, currentLine, currentLineIndex) => {
			result.push(currentLine);
			if (lineIndex === currentLineIndex) {
				result.push(newLine);
			}
			return result;
		}, []);
	};

	return prevData.reduce<EditorData>((result, row, currentRowIndex) => {
		if (rowIndex === currentRowIndex) {
			const updatedRow = updateRow(row, lineIndex, newLine);
			result.push(updatedRow);
		} else {
			result.push(row);
		}
		return result;
	}, []);
};

/**
 * creates new row and new line with the new value
 * keeps the rest of the lines and rows the same
 */
export const updateLineValue = (prevData: EditorData, rowIndex: number, lineIndex: number, newValue: EditorLineValue): EditorData => {
	// could move these functions out of 'updateLineValue', but this way
	// makes it easier to understand, that they're used only here
	const updateLine = (line: EditorDataLine, newValue: EditorLineValue): EditorDataLine => {
		return { ...line, value: newValue };
	};

	const updateRow = (row: EditorDataRow, lineIndex: number, newValue: EditorLineValue): EditorDataRow => {
		return row.reduce<EditorDataRow>((newRow, currentLine, currentLineIndex) => {
			if (lineIndex === currentLineIndex) {
				const updatedLine = updateLine(currentLine, newValue);
				newRow.push(updatedLine);
			} else {
				newRow.push(currentLine);
			}
			return newRow;
		}, []);
	};

	return prevData.reduce<EditorData>((result, row, currentRowIndex) => {
		if (rowIndex === currentRowIndex) {
			const updatedRow = updateRow(row, lineIndex, newValue);
			result.push(updatedRow);
		} else {
			result.push(row);
		}
		return result;
	}, []);
};

/**
 * creates new row without the line
 * keeps the rest of the rows the same
 */
export const deleteLine = (prevData: EditorData, rowIndex: number, lineIndex: number): EditorData => {
	return prevData.reduce<EditorData>((result, row, currentRowIndex) => {
		if (rowIndex === currentRowIndex) {
			const filteredRow = row.filter(
				(_, currentLineIndex) => lineIndex !== currentLineIndex
			);
			result.push(filteredRow);
		} else {
			result.push(row);
		}
		return result;
	}, []);
};