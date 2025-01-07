import React from "react";
import { Layout } from "antd";
import { useStyles } from "./Page.styles.ts";
import { WithChildren } from "../../utils/utilityTypes.ts";

type PageProps = WithChildren;

export const Page: React.FC<PageProps> = ({ children }) => {
  const { styles } = useStyles();

  return (
    <Layout.Content className={styles.pageRoot}>{children}</Layout.Content>
  );
};
