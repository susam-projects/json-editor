import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css }) => ({
  list: css`
    ul,
    li {
      margin: 0;
      padding: 0;
      text-indent: 0;
      list-style: none;
    }
  `,
}));
