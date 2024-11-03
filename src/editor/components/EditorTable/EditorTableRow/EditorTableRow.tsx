import React from 'react';
import { WithChildren } from '../../../../utils/utilityTypes.ts';

type EditorRowProps = WithChildren

export const EditorTableRow: React.FC<EditorRowProps> = ({ children }) => {
	return (
		<>
			{children}
			<tr className="editor-table__row-margin editor-table__row-border" />
			<tr className="editor-table__row-margin" />
		</>
	);
};
