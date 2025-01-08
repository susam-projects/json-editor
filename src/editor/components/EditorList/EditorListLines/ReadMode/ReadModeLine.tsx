import { EditorLineValue } from "../../../../types/EditorData.ts";
import React from "react";
import { textEn } from "../../../../../text";

type ReadModeFieldProps = {
  label: string;
  value: EditorLineValue;
  onAddClick: () => void;
  onEditClick: () => void;
};

export const ReadModeLine: React.FC<ReadModeFieldProps> = ({
  label,
  value,
  onAddClick,
  onEditClick,
}) => {
  return (
    <div className="editor-list__field-read">
      <div className="editor-list__field__label">{label}</div>
      <div className="editor-list__field__value">{value}</div>
      <div className="editor-list__field__controls">
        <button
          type="button"
          className="editor-list__field__edit-button"
          onClick={onEditClick}
        >
          {textEn.editorPage.editorList.editLineButton}
        </button>
        <button
          type="button"
          className="editor-list__field__add-line-button"
          onClick={onAddClick}
        >
          {textEn.editorPage.editorList.addLineButton}
        </button>
      </div>
    </div>
  );
};
