import React from "react";

type EditLineLabelProps = {
  label: string;
};

export const EditLineLabel: React.FC<EditLineLabelProps> = ({ label }) => {
  return <div className="editor-list__field__label">{label}</div>;
};
