import React from "react";
import { EditLineProps } from "../utils/types.ts";
import { useNumberEditValue } from "../utils/useNumberEditValue.ts";
import { EditLineWrapper } from "./lineWrapper/EditLineWrapper.tsx";
import { EditLineLabel } from "./lineLabel/EditLineLabel.tsx";
import { EditControls } from "./editControls/EditControls.tsx";
import { InputEditor } from "./editors/InputEditor.tsx";

type EditNumberFieldProps = EditLineProps<number>;

export const EditNumberLine: React.FC<EditNumberFieldProps> = ({
  label,
  value,
  isEdit,
  onApply,
  onCancel,
  onDelete,
}) => {
  const { editValue, handleInputChange, handleInputKeyDown, handleApply } =
    useNumberEditValue(value, isEdit, onApply, onCancel);

  return (
    <EditLineWrapper>
      <EditLineLabel label={label} />
      <InputEditor
        inputType="number"
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
