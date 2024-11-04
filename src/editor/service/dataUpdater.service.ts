import { EditorData, EditorDataRow, EditorLineValue } from '../types/EditorData.ts';

export const updateLineValue = (prevData: EditorData, rowIndex: number, lineIndex: number, newValue: EditorLineValue): EditorData => {
	return prevData.reduce<EditorData>((result, row, currentRowIndex) => {
		// creating new row and new line with the new value
		// keeping the rest lines and rows the same
		if (rowIndex === currentRowIndex) {
			const updatedRow = row.reduce<EditorDataRow>((newRow, currentLine, currentLineIndex) => {
				if (lineIndex === currentLineIndex) {
					const updatedLine = { ...currentLine, value: newValue };
					newRow.push(updatedLine);
				} else {
					newRow.push(currentLine);
				}
				return newRow;
			}, []);
			result.push(updatedRow);
		} else {
			result.push(row);
		}
		return result;
	}, []);
};

export const deleteLine = (prevData: EditorData, rowIndex: number, lineIndex: number): EditorData => {
	return prevData.reduce<EditorData>((result, row, currentRowIndex) => {
		// creating new row without the line
		// keeping the rest of the rows the same
		if (rowIndex === currentRowIndex) {
			const filteredRow = row.filter(
				(_, currentLineIndex) => lineIndex !== currentLineIndex
			);
			if (filteredRow.length) {
				result.push(filteredRow);
			}
		} else {
			result.push(row);
		}
		return result;
	}, []);
};
