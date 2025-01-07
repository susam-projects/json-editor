import React from "react";
import { NewValueHandler } from "./types.ts";
import {
  EditorDataLine,
  EditorLineValue,
} from "../../../../types/EditorData.ts";

export const useLineValue = <T extends EditorLineValue>(
  data: EditorDataLine<T>,
  onChange: NewValueHandler<T>,
) => {
  const [isEdit, setIsEdit] = React.useState(false);

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleApply = (newValue: T) => {
    if (data.value !== newValue) {
      onChange(newValue);
    }
    setIsEdit(false);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  return {
    isEdit,
    handleEditClick,
    handleApply,
    handleCancel,
  };
};
