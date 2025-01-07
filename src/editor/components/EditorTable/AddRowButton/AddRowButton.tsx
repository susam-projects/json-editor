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
    <tr>
      <td colSpan={3} className="editor-table__add-button">
        <button type="button" onClick={handleClick}>
          {textEn.editorPage.editorTable.addRowButton}
        </button>
      </td>
    </tr>
  );
};

export const AddRowButton = React.memo(AddRowButtonComponent);
