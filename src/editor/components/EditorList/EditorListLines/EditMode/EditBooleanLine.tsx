import React from "react";
import { EditLineProps } from "../utils/types.ts";
import { useBooleanEditValue } from "../utils/useBooleanEditValue.ts";
import { EditControls } from "./editControls/EditControls.tsx";
import { EditLineWrapper } from "./lineWrapper/EditLineWrapper.tsx";
import { EditLineLabel } from "./lineLabel/EditLineLabel.tsx";
import { BooleanEditor } from "./editors/BooleanEditor.tsx";

type EditBooleanLineProps = EditLineProps<boolean>;

export const EditBooleanLine: React.FC<EditBooleanLineProps> = ({
  label,
  value,
  isEdit,
  onApply,
  onCancel,
  onDelete,
}) => {
  const { editValue, handleInputChange, handleApply } = useBooleanEditValue(
    value,
    isEdit,
    onApply,
  );

  return (
    <EditLineWrapper>
      <EditLineLabel label={label} />
      <BooleanEditor editValue={editValue} onInputChange={handleInputChange} />
      <EditControls
        onApply={handleApply}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    </EditLineWrapper>
  );
};
