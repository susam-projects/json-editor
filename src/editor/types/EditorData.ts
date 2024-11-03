export type EditorData = EditorDataRow[];

export type EditorDataRow = Array<EditorDataLine>;

export type EditorDataLine<T extends EditorLineValue = EditorLineValue> = {
  type: EditorDataLineType;
  label: string;
  value: T;
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
