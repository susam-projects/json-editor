import React from "react";

export const useNumberEditValue = (
  value: number,
  isEdit: boolean,
  onApply: (value: number) => void,
  onCancel: () => void,
) => {
  const [editValue, setEditValue] = React.useState("");

  React.useEffect(() => {
    setEditValue(String(value));
  }, [isEdit, value]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setEditValue(event.target.value);
  };

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
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
    const parsedValue = Number.parseFloat(editValue);
    if (!Number.isNaN(parsedValue)) {
      onApply(parsedValue);
    } else {
      onCancel();
    }
  };

  return {
    editValue,
    handleInputChange,
    handleInputKeyDown,
    handleApply,
  };
};
