import { RadioGroupOnChange } from "../../utils/useBooleanEditValue.ts";
import React from "react";
import { Radio } from "antd";
import { textEn } from "../../../../../../text";

type BooleanEditorProps = {
  editValue: string;
  onInputChange: RadioGroupOnChange;
};

export const BooleanEditor: React.FC<BooleanEditorProps> = ({
  editValue,
  onInputChange,
}) => {
  return (
    <div className="editor-list__field__edit-value">
      <Radio.Group value={editValue} onChange={onInputChange}>
        <Radio value="true">{textEn.editorPage.editorList.booleanTrue}</Radio>
        <Radio value="false">{textEn.editorPage.editorList.booleanFalse}</Radio>
      </Radio.Group>
    </div>
  );
};
