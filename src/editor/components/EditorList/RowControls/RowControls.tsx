import React from "react";
import { Space } from "antd";
import { textEn } from "../../../../text";

type RowControlsProps = {
  rowIndex: number;
  onAddFirstLineClick: (rowIndex: number) => void;
  onDeleteRowClick: (rowIndex: number) => void;
};

const RowControlsComponent: React.FC<RowControlsProps> = ({
  rowIndex,
  onAddFirstLineClick,
  onDeleteRowClick,
}) => {
  const [isEdit, setIsEdit] = React.useState(false);

  const handAddLineClick = () => {
    onAddFirstLineClick(rowIndex);
  };

  const handleDeleteRowClick = () => {
    onDeleteRowClick(rowIndex);
  };

  const handleEditRowClick = () => {
    setIsEdit(true);
  };

  const handleCancelEditRowClick = () => {
    setIsEdit(false);
  };

  return (
    <div className="editor-list__row-controls">
      {isEdit ? (
        <Space>
          <button
            type="button"
            className="editor-list__delete-row-button"
            onClick={handleDeleteRowClick}
          >
            {textEn.editorPage.editorList.deleteRowButton}
          </button>
          <button type="button" onClick={handAddLineClick}>
            {textEn.editorPage.editorList.addFirstLineButton}
          </button>
          <button type="button" onClick={handleCancelEditRowClick}>
            {textEn.app.cancel}
          </button>
        </Space>
      ) : (
        <button type="button" onClick={handleEditRowClick}>
          {textEn.editorPage.editorList.editRowButton}
        </button>
      )}
    </div>
  );
};

export const RowControls = React.memo(RowControlsComponent);
