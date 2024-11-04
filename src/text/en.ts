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
			placeholder: `[
  { "sample": "value" },
  { "another": "value" }
]`,
		},
		deleteConfirm: {
			title: 'Do you want to delete the line?',
			description: (rowIndex: number, lineIndex: number) => `Row ${rowIndex} line ${lineIndex}`,
		},
		error: {
			errorParsingData: 'Error parsing data!',
		},
		editorTable: {
			labelColumn: 'label column',
			valueColumn: 'value column',
			buttonsColumn: 'buttons column',
			lineInputLabel: 'input cell',
			booleanTrue: 'True',
			booleanFalse: 'False',
			editButton: 'Edit',
			deleteButton: 'Delete',
		},
	},
};
