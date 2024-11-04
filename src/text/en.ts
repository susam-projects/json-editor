const SET_DATA_INPUT_PLACEHOLDER = `[
  { "sample": "value" },
  { "another": "value" }
]`;

export const textEn = {
	app: {
		ok: 'Ok',
		cancel: 'Cancel',
	},
	editorPage: {
		title: 'JSON Editor',
		subTitle: 'Note: By default a hardcoded JSON is used. You can set any other one with the "Set JSON" button.',
		setDataButton: 'Set JSON',
		setDataModal: {
			title: 'Input JSON',
			placeholder: SET_DATA_INPUT_PLACEHOLDER,
		},
		addLineModal: {
			title: 'Add new line',
			disclaimer: 'Note: This modal is implemented in the simplest way (without validation, without different input types), because have thought that it\'s not a required part of the task.',
			typeLabel: 'Type',
			typePlaceholder: 'String, Number, etc.',
			labelLabel: 'Label',
			labelPlaceholder: 'Some label',
			valueLabel: 'Value',
			valuePlaceholder: 'Some value',
		},
		deleteRowConfirm: {
			title: 'Do you want to delete the row?',
			description: (rowIndex: number) => `Row ${rowIndex}`,
		},
		deleteLineConfirm: {
			title: 'Do you want to delete the line?',
			description: (rowIndex: number, lineIndex: number) => `Row ${rowIndex} line ${lineIndex}`,
		},
		error: {
			errorParsingData: 'Error parsing data!',
			newLineValidationError: 'Fill all the fields, please!',
		},
		editorTable: {
			labelColumn: 'label column',
			valueColumn: 'value column',
			buttonsColumn: 'buttons column',
			lineInputLabel: 'input cell',
			booleanTrue: 'True',
			booleanFalse: 'False',
			addRowButton: '+ Add row',
			addFirstLineButton: '+ Add first line',
			deleteRowButton: 'Delete row',
			editRowButton: 'Edit row',
			addLineButton: '+',
			editLineButton: 'Edit',
			deleteButton: 'Delete',
		},
	},
};
