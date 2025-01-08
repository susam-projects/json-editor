import React from "react";
import { WithChildren } from "../../../../../../utils/utilityTypes.ts";

type EditLineWrapperProps = WithChildren;

export const EditLineWrapper: React.FC<EditLineWrapperProps> = ({
  children,
}) => {
  return <div className="editor-list__field-edit">{children}</div>;
};
