import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
	title: css`
    text-align: center;
  `,

	dataButton: css`
    margin-bottom: ${token.marginLG}px;
  `,
}));
