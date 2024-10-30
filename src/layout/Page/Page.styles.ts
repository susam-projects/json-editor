import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
	pageRoot: css`
    margin: 0 auto;
    padding: ${token.paddingXL * 2}px ${token.paddingXL}px;
    max-width: ${1200 + token.paddingXL * 2}px;
  `,
}));
