import React from 'react';
import { useStyles } from './Editor.styles.ts';
import { Collapse } from 'antd';
import { EditorField } from './EditorField/EditorField.tsx';

import jsonSample from './json-sample.json';

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
			<p>
				<EditorField label="id" value="some-id-id-id" />
				<EditorField label="string" value="string value" />
				<EditorField label="number" value="321" />
				<EditorField label="email" value="some@email.com" />
				<EditorField label="date" value="11-01-2024" />
				<EditorField label="boolean" value="false" />
				<EditorField
					label="text"
					value={`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
          `}
				/>
			</p>
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

console.log(jsonSample);

export const Editor: React.FC<IEditorProps> = () => {
	const { styles } = useStyles();
	console.log(styles);

	return <Collapse items={items} />;
};
