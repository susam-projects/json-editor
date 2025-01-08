import React from "react";

type TextareaEditorProps = {
  editValue: string;
  onInputChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onInputKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement>;
};

export const TextareaEditor: React.FC<TextareaEditorProps> = ({
  editValue,
  onInputKeyDown,
  onInputChange,
}) => {
  return (
    <div className="editor-list__field__edit-value">
      <textarea
        value={editValue}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
      />
    </div>
  );
};
