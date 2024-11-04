export type EditorData = EditorDataRow[];

export type EditorDataRow = Array<EditorDataLine>;

export type EditorDataLine<T extends EditorLineValue = EditorLineValue> = {
  type: EditorDataLineType;
  label: string;
  value: T;
	// it's not currently used, but could be used for filtering in case of implementing it
	// keeping it just to show the way I would handle filtering of the data
  isVisible: boolean;
}

export type EditorLineValue = string | number | boolean;

export const enum EditorDataLineType {
  Unknown = 'Unknown',
  Id = 'Id',
  String = 'String',
  Number = 'Number',
  Email = 'Email',
  Date = 'Date',
  Boolean = 'Boolean',
  Text = 'Text',
}
