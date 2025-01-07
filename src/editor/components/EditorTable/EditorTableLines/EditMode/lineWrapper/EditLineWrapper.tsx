import React from "react";
import { WithChildren } from "../../../../../../utils/utilityTypes.ts";

type EditLineWrapperProps = WithChildren;

export const EditLineWrapper: React.FC<EditLineWrapperProps> = ({
  children,
}) => {
  return <tr className="editor-table__field-edit">{children}</tr>;
};
