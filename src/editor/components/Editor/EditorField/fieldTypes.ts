export interface IFieldInfo<T> {
  label: string;
  value: T;
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
	return !Number.isNaN(Number(field.value));
};

export const isEmail = (field: IFieldInfo<unknown>) => {
	return false;
};

export const isDate = (field: IFieldInfo<unknown>) => {
	return false;
};

export const isBoolean = (field: IFieldInfo<unknown>) => {
	return [true, false, 'true', 'false'].some(possibleValue => possibleValue === field.value);
};
