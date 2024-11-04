import {
	EditorDataLine,
	EditorLineValue,
} from '../../../../types/EditorData.ts';

export type NewValueHandler<T> = (newValue: T) => void;

export type ConcreteLineProps<T extends EditorLineValue = EditorLineValue> = {
  data: EditorDataLine<T>;
	onChange: NewValueHandler<T>;
	onDelete: () => void;
};

export type EditLineProps<T> = {
  label: string;
  value: T;
  isEdit: boolean;
  onApply: (newValue: T) => void;
  onCancel: () => void;
	onDelete: () => void;
};

export type StringInputElement = HTMLInputElement | HTMLTextAreaElement;
