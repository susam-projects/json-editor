import React from "react";
import { EditLineProps } from "../utils/types.ts";
import { useStringEditValue } from "../utils/useStringEditValue.ts";
import { EditLineWrapper } from "./lineWrapper/EditLineWrapper.tsx";
import { EditLineLabel } from "./lineLabel/EditLineLabel.tsx";
import { EditControls } from "./editControls/EditControls.tsx";
import { InputEditor } from "./editors/InputEditor.tsx";

type EditStringFieldProps = EditLineProps<string>;

export const EditStringLine: React.FC<EditStringFieldProps> = ({
  label,
  value,
  isEdit,
  onApply,
  onCancel,
  onDelete,
}) => {
  const { editValue, handleInputChange, handleInputKeyDown, handleApply } =
    useStringEditValue(value, isEdit, onApply, onCancel);

  return (
    <EditLineWrapper>
      <EditLineLabel label={label} />
      <InputEditor
        inputType="text"
        editValue={editValue}
        onInputChange={handleInputChange}
        onInputKeyDown={handleInputKeyDown}
      />
      <EditControls
        onApply={handleApply}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    </EditLineWrapper>
  );
};
