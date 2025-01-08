import React from "react";
import { Space } from "antd";
import { textEn } from "../../../../../../text";

type EditControlsProps = {
  onApply: () => void;
  onCancel: () => void;
  onDelete: () => void;
};

export const EditControls: React.FC<EditControlsProps> = ({
  onApply,
  onCancel,
  onDelete,
}) => {
  return (
    <div className="editor-list__field__controls">
      <Space>
        <button
          type="button"
          className="editor-list__field__delete-button"
          onClick={onDelete}
        >
          {textEn.editorPage.editorList.deleteButton}
        </button>
        <button
          type="button"
          className="editor-list__field__apply-button"
          onClick={onApply}
        >
          {textEn.app.ok}
        </button>
        <button
          type="button"
          className="editor-list__field__cancel-button"
          onClick={onCancel}
        >
          {textEn.app.cancel}
        </button>
      </Space>
    </div>
  );
};
