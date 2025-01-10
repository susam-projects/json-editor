const SET_DATA_INPUT_PLACEHOLDER = `[
  { "sample": "value" },
  { "another": "value" }
]`;

export const textEn = {
  app: {
    ok: "Ok",
    cancel: "Cancel",
  },
  editorPage: {
    title: "JSON Editor",
    subTitle1:
      'Note 1: By default a hardcoded JSON is used. Another one can be set with the "Set JSON" button.',
    subTitle2:
      "Note 2: Implemented 2 variants of list virtualization. You can choose which to use with the radio buttons.",
    setDataButton: "Set JSON",
    downloadDataButton: "Download JSON",
    listType: {
      label: "List type:",
      custom: "Custom",
      virtuoso: "NPM library",
    },
    setDataModal: {
      title: "Input JSON",
      placeholder: SET_DATA_INPUT_PLACEHOLDER,
    },
    addLineModal: {
      title: "Add new line",
      disclaimer:
        "Note: This modal is implemented in the simplest way (without validation, without different input types), because it looked like it's wasn't a required part of the task.",
      typeLabel: "Type",
      typePlaceholder: "String, Number, etc.",
      labelLabel: "Label",
      labelPlaceholder: "Some label",
      valueLabel: "Value",
      valuePlaceholder: "Some value",
    },
    deleteRowConfirm: {
      title: "Do you want to delete the row?",
      description: (rowIndex: number) => `Row ${rowIndex}`,
    },
    deleteLineConfirm: {
      title: "Do you want to delete the line?",
      description: (rowIndex: number, lineIndex: number) =>
        `Row ${rowIndex} line ${lineIndex}`,
    },
    error: {
      errorParsingData: "Error parsing data!",
      newLineValidationError: "Fill all the fields, please!",
    },
    editorList: {
      booleanTrue: "True",
      booleanFalse: "False",
      addRowButton: "+ Add row",
      addFirstLineButton: "+ Add first line",
      deleteRowButton: "Delete row",
      editRowButton: "Edit row",
      addLineButton: "+",
      editLineButton: "Edit",
      deleteButton: "Delete",
    },
  },
};
