import React from 'react';

interface IEditorRowProps {
  children: React.ReactNode | React.ReactNode[];
}

export const EditorRow: React.FC<IEditorRowProps> = ({ children }) => {
	return (
		<table>
			<tbody>{children}</tbody>
		</table>
	);
};
