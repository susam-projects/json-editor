import React from 'react';
import { Layout } from 'antd';
import { useStyles } from './Page.styles.ts';

interface IPageProps {
  children: React.ReactNode | React.ReactNode[];
}

export const Page: React.FC<IPageProps> = ({ children }) => {
	const { styles } = useStyles();

	return <Layout.Content className={styles.wrapper}>{children}</Layout.Content>;
};
