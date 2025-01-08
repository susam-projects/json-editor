import React, { HTMLInputTypeAttribute } from "react";

type InputEditorProps = {
  inputType: HTMLInputTypeAttribute;
  editValue: string;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onInputKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
};

export const InputEditor: React.FC<InputEditorProps> = ({
  inputType,
  editValue,
  onInputKeyDown,
  onInputChange,
}) => {
  return (
    <div className="editor-list__field__edit-value">
      <input
        type={inputType}
        value={editValue}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
      />
    </div>
  );
};
