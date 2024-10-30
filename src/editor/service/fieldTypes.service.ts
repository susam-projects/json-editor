import dayjs from 'dayjs';

export const enum FieldType {
  Id,
  String,
  Number,
  Email,
  Date,
  Boolean,
  Text,
}

export interface IFieldInfo<T> {
  label: string;
  value: T;
  type: FieldType;
}

export const isId = (field: IFieldInfo<unknown>) => {
	return String(field.label).toLowerCase() === 'id';
};

export const isText = (field: IFieldInfo<unknown>) => {
	return isString(field) && (field.value as string).length > 100;
};

export const isString = (field: IFieldInfo<unknown>) => {
	return typeof field.value === 'string';
};

export const isNumber = (field: IFieldInfo<unknown>) => {
	return typeof field.value === 'number' && !Number.isNaN(field.value);
};

// const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const SIMPLE_EMAIL_REGEXP = /\S+@\S+\.\S+/;
export const isEmail = (field: IFieldInfo<unknown>) => {
	return SIMPLE_EMAIL_REGEXP.test(String(field.value));
};

export const isDate = (field: IFieldInfo<unknown>) => {
	return dayjs(String(field.value)).isValid();
};

export const isBoolean = (field: IFieldInfo<unknown>) => {
	return [true, false, 'true', 'false'].some(possibleValue => possibleValue === field.value);
};
