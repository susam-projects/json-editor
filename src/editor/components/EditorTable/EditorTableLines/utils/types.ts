import {
	EditorDataLine,
	EditorLineValue,
} from '../../../../types/EditorData.ts';

export interface ConcreteLineProps<T extends EditorLineValue = EditorLineValue> {
  data: EditorDataLine<T>
}

export interface EditLineProps<T> {
  label: string;
  value: T;
  isEdit: boolean;
  onApply: (newValue: T) => void;
  onCancel: () => void;
}

export type StringInputElement = HTMLInputElement | HTMLTextAreaElement;
