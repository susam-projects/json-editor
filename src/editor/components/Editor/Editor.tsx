import React from 'react';
import { useStyles } from './Editor.styles.ts';
import { Collapse } from 'antd';
import { EditorField } from '../EditorField/EditorField.tsx';
import { FieldType } from '../../service/fieldTypes.service.ts';
import { EditorRow } from '../EditorRow/EditorRow.tsx';

import jsonSample from '../../data/json-sample.json';

interface IEditorProps {
  view: ViewType;
}

export const enum ViewType {
  Collapse,
  Table,
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

type TCollapseItems = React.ComponentProps<typeof Collapse>['items'];

const items: TCollapseItems = [
	{
		key: '1',
		label: '1 (213231-asdfdsf34-3dfd34-343fdf)',
		children: (
			<EditorRow>
				<EditorField field={{ label: 'id', value: 'some-id-id-id', type: FieldType.Id }} />
				<EditorField field={{ label: 'string', value: 'string value', type: FieldType.String }} />
				<EditorField field={{ label: 'number', value: 321, type: FieldType.Number }} />
				<EditorField field={{ label: 'email', value: 'some@email.com', type: FieldType.Email }} />
				<EditorField field={{ label: 'date', value: '11-01-2024', type: FieldType.Date }} />
				<EditorField field={{ label: 'boolean', value: false, type: FieldType.Boolean }} />
				<EditorField
					field={{
						label: 'text',
						type: FieldType.Id,
						value: `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
          `,
					}}
				/>
			</EditorRow>
		),
	},
	{
		key: '2',
		label: '2 (213231-asdfdsf34-3dfd34-343fdf)',
		children: <p>{text}</p>,
	},
	{
		key: '3',
		label: '3 (213231-asdfdsf34-3dfd34-343fdf)',
		children: <p>{text}</p>,
	},
];

// check type once, not on rerender

console.log(jsonSample);

export const Editor: React.FC<IEditorProps> = () => {
	const { styles } = useStyles();
	console.log(styles);

	return <Collapse items={items} />;
};
