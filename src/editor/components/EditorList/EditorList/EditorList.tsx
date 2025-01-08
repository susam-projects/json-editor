import React from "react";
import { WithChildren } from "../../../../utils/utilityTypes.ts";
import { useStyles } from "../EditorList.styles.ts";

type EditorListProps = WithChildren;

export const EditorList: React.FC<EditorListProps> = ({ children }) => {
  const { styles } = useStyles();

  return <div className={styles.editor}>{children}</div>;
};
