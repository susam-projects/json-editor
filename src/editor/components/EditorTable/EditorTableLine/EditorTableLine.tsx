import React from 'react';
import {
	EditorDataLine,
	EditorDataLineType,
} from '../../../types/EditorData.ts';
import {
	BooleanLine,
	DateLine,
	EmailLine,
	NumberLine,
	StringLine,
	TextLine,
} from '../EditorTableLines';

type EditorLineProps = {
  data: EditorDataLine
};

export const EditorTableLine: React.FC<EditorLineProps> = ({ data }) => {
	if (!data.isVisible) {
		return null;
	}

	// unlike a map, switch allows to specify exact data types
	switch (data.type) {
	case EditorDataLineType.String:
		return <StringLine data={data as EditorDataLine<string>} />;

	case EditorDataLineType.Number:
		return <NumberLine data={data as EditorDataLine<number>} />;

	case EditorDataLineType.Email:
		return <EmailLine data={data as EditorDataLine<string>} />;

	case EditorDataLineType.Date:
		return <DateLine data={data as EditorDataLine<string>} />;

	case EditorDataLineType.Boolean:
		return <BooleanLine data={data as EditorDataLine<boolean>} />;

	case EditorDataLineType.Text:
		return <TextLine data={data as EditorDataLine<string>} />;

	case EditorDataLineType.Id:
	case EditorDataLineType.Unknown:
	default:
		return null;
	}
};
