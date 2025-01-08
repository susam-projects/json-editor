import React from "react";
import { textEn } from "../../../../text";

type AddRowButtonProps = {
  rowIndex: number;
  onClick: (rowIndex: number) => void;
};

const AddRowButtonComponent: React.FC<AddRowButtonProps> = ({
  rowIndex,
  onClick,
}) => {
  const handleClick = () => {
    onClick(rowIndex);
  };

  return (
    <div className="editor-list__add-button">
      <button type="button" onClick={handleClick}>
        {textEn.editorPage.editorList.addRowButton}
      </button>
    </div>
  );
};

export const AddRowButton = React.memo(AddRowButtonComponent);
