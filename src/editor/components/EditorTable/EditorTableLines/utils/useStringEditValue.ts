import React from "react";
import { StringInputElement } from "./types.ts";

export const useStringEditValue = (
  value: string,
  isEdit: boolean,
  onApply: (value: string) => void,
  onCancel: () => void,
) => {
  const [editValue, setEditValue] = React.useState("");

  React.useEffect(() => {
    setEditValue(value);
  }, [isEdit, value]);

  const handleInputChange: React.ChangeEventHandler<StringInputElement> = (
    event,
  ) => {
    setEditValue(event.target.value);
  };

  const handleInputKeyDown: React.KeyboardEventHandler<StringInputElement> = (
    event,
  ) => {
    if (event.key === "Enter") {
      handleApply();
    }
    if (event.key === "Escape") {
      onCancel();
    }
  };

  const handleApply = () => {
    onApply(editValue);
  };

  return {
    editValue,
    handleInputChange,
    handleInputKeyDown,
    handleApply,
  };
};
