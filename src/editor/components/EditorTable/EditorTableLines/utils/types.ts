import {
	EditorDataLine,
	EditorLineValue,
} from '../../../../types/EditorData.ts';

export type ConcreteLineProps<T extends EditorLineValue = EditorLineValue> = {
  data: EditorDataLine<T>;
	onDelete: () => void;
};

export type EditLineProps<T> = {
  label: string;
  value: T;
  isEdit: boolean;
  onApply: (newValue: T) => void;
  onCancel: () => void;
};

export type StringInputElement = HTMLInputElement | HTMLTextAreaElement;
