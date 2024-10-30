import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
	field: css`
    &:hover {
      color: ${token.colorPrimary};
    }
  `,

	fieldValue: css`
    padding: ${token.paddingXS}px ${token.padding}px;
  `,

	fieldEditValue: css`
    padding: ${token.paddingXS}px ${token.padding}px;
    color: ${token.colorText};
  `,

	editIcon: css`
    cursor: pointer;
  `,

	applyIcon: css`
    cursor: pointer;
    &:hover {
      color: ${token.colorSuccess};
    }
  `,

	cancelIcon: css`
    cursor: pointer;
    &:hover {
      color: ${token.colorError};
    }
  `,
}));
