import React from "react";
import { WithChildren } from "../../../../utils/utilityTypes.ts";

type EditorListRowProps = WithChildren;

export const EditorListRow: React.FC<EditorListRowProps> = ({ children }) => {
  return (
    <>
      {children}
      <div className="editor-list__row-margin editor-list__row-border" />
      <div className="editor-list__row-margin" />
    </>
  );
};
