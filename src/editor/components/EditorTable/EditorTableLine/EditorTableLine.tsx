import React from "react";
import {
  EditorDataLine,
  EditorDataLineType,
  EditorLineValue,
} from "../../../types/EditorData.ts";
import {
  BooleanLine,
  DateLine,
  EmailLine,
  NumberLine,
  StringLine,
  TextLine,
  ConcreteLineProps,
} from "../EditorTableLines";

export type AddLineHandler = (rowIndex: number, prevLineIndex: number) => void;
export type ChangeLineHandler = (
  rowIndex: number,
  lineIndex: number,
  newValue: EditorLineValue,
) => void;
export type DeleteLineHandler = (rowIndex: number, lineIndex: number) => void;

type EditorLineProps = {
  data: EditorDataLine;
  rowIndex: number;
  lineIndex: number;
  onAddLine: AddLineHandler;
  onChange: ChangeLineHandler;
  onDelete: DeleteLineHandler;
};

const LINE_COMPONENTS: Record<
  EditorDataLineType,
  React.FC<ConcreteLineProps> | null
> = {
  [EditorDataLineType.Unknown]: null,
  [EditorDataLineType.Id]: null,
  [EditorDataLineType.String]: StringLine as React.FC<ConcreteLineProps>,
  [EditorDataLineType.Number]: NumberLine as React.FC<ConcreteLineProps>,
  [EditorDataLineType.Email]: EmailLine as React.FC<ConcreteLineProps>,
  [EditorDataLineType.Date]: DateLine as React.FC<ConcreteLineProps>,
  [EditorDataLineType.Boolean]: BooleanLine as React.FC<ConcreteLineProps>,
  [EditorDataLineType.Text]: TextLine as React.FC<ConcreteLineProps>,
};

const EditorTableLineComponent: React.FC<EditorLineProps> = ({
  data,
  rowIndex,
  lineIndex,
  onAddLine,
  onChange,
  onDelete,
}) => {
  const handleAddLine = () => {
    onAddLine(rowIndex, lineIndex);
  };

  const handleChange = (newValue: EditorLineValue) => {
    onChange(rowIndex, lineIndex, newValue);
  };

  const handleDelete = () => {
    onDelete(rowIndex, lineIndex);
  };

  if (!data.isVisible) {
    return null;
  }

  const LineComponent = LINE_COMPONENTS[data.type];
  if (LineComponent) {
    return (
      <LineComponent
        data={data}
        onAddLine={handleAddLine}
        onChange={handleChange}
        onDelete={handleDelete}
      />
    );
  }
  return null;
};

export const EditorTableLine = React.memo(EditorTableLineComponent);
