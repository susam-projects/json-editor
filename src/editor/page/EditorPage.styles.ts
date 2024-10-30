import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
	verticalSpace: css`
    display: flex;
  `,

	title: css`
    text-align: center;
  `,

	subtitle: css`
    display: block;
    text-align: center;
    color: ${token.colorTextDisabled};
  `,
}));
