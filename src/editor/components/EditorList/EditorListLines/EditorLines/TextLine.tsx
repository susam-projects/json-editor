import React from "react";
import { ConcreteLineProps } from "../utils/types.ts";
import { useLineValue } from "../utils/useLineValue.ts";
import { EditTextLine } from "../EditMode/EditTextLine.tsx";
import { ReadModeLine } from "../ReadMode/ReadModeLine.tsx";

export const TextLine: React.FC<ConcreteLineProps<string>> = ({
  data,
  onAddLine,
  onChange,
  onDelete,
}) => {
  const { isEdit, handleEditClick, handleApply, handleCancel } = useLineValue(
    data,
    onChange,
  );

  if (isEdit) {
    return (
      <EditTextLine
        label={data.label}
        value={data.value}
        isEdit={isEdit}
        onApply={handleApply}
        onCancel={handleCancel}
        onDelete={onDelete}
      />
    );
  }

  return (
    <ReadModeLine
      label={data.label}
      value={data.value}
      onAddClick={onAddLine}
      onEditClick={handleEditClick}
    />
  );
};
