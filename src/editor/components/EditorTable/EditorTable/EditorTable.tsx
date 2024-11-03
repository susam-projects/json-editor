import React from 'react';
import { WithChildren } from '../../../../utils/utilityTypes.ts';
import { useStyles } from '../EditorTable.styles.ts';
import { textEn } from '../../../../text';

type EditorTableProps = WithChildren;

export const EditorTable: React.FC<EditorTableProps> = ({ children }) => {
	const { styles } = useStyles();

	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th
						className="editor-table__label-column"
						aria-label={textEn.editorPage.editorTable.labelColumn}
					/>
					<th aria-label={textEn.editorPage.editorTable.valueColumn} />
					<th
						className="editor-table__buttons-column"
						aria-label={textEn.editorPage.editorTable.buttonsColumn}
					/>
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</table>
	);
};
