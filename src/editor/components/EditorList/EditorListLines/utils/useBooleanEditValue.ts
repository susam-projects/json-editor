import React from "react";
import { Radio } from "antd";

export type RadioGroupOnChange = React.ComponentProps<
  typeof Radio.Group
>["onChange"];

export const useBooleanEditValue = (
  value: boolean,
  isEdit: boolean,
  onApply: (value: boolean) => void,
) => {
  const [editValue, setEditValue] = React.useState(String(value));

  React.useEffect(() => {
    setEditValue(String(value));
  }, [isEdit, value]);

  const handleInputChange: RadioGroupOnChange = (event) => {
    setEditValue(event.target.value as string);
  };

  const handleApply = () => {
    onApply(editValue === "true");
  };

  return {
    editValue,
    handleInputChange,
    handleApply,
  };
};
