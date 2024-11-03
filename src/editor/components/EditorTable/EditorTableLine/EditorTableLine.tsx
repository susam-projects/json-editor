import React from 'react';
import {
	EditorDataLine,
	EditorDataLineType,
} from '../../../types/EditorData.ts';
import {
	BooleanField,
	DateField,
	EmailField,
	NumberField,
	StringField,
	TextField,
} from '../EditorTableFields/EditorTableFields.tsx';

interface EditorLineProps {
  data: EditorDataLine
}

export const EditorTableLine: React.FC<EditorLineProps> = ({ data }) => {
	if (!data.isVisible) {
		return null;
	}

	switch (data.type) {
	case EditorDataLineType.String:
		return <StringField data={data as EditorDataLine<string>} />;

	case EditorDataLineType.Number:
		return <NumberField data={data as EditorDataLine<number>} />;

	case EditorDataLineType.Email:
		return <EmailField data={data as EditorDataLine<string>} />;

	case EditorDataLineType.Date:
		return <DateField data={data as EditorDataLine<string>} />;

	case EditorDataLineType.Boolean:
		return <BooleanField data={data as EditorDataLine<boolean>} />;

	case EditorDataLineType.Text:
		return <TextField data={data as EditorDataLine<string>} />;

	case EditorDataLineType.Id:
	case EditorDataLineType.Unknown:
	default:
		return null;
	}
};
