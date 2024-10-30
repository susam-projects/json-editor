import React from 'react';
import {
	IFieldInfo, isBoolean, isDate, isEmail, isId, isNumber, isString, isText,
} from './fieldTypes.ts';

type TFieldProps = IFieldInfo<unknown>;

export const EditorField: React.FC<TFieldProps> = (props) => {
	if (isId(props)) {
		return null;
	}
	if (isText(props)) {
		return <TextField {...props as TConcreteFieldProps<string>} />;
	}
	if (isEmail(props)) {
		return <EmailField {...props as TConcreteFieldProps<string>} />;
	}
	if (isDate(props)) {
		return <DateField {...props as TConcreteFieldProps<string>} />;
	}
	if (isString(props)) {
		return <StringField {...props as TConcreteFieldProps<string>} />;
	}
	if (isNumber(props)) {
		return <NumberField {...props as TConcreteFieldProps<number>} />;
	}
	if (isBoolean(props)) {
		return <BooleanField {...props as TConcreteFieldProps<boolean>} />;
	}
	return null;
};

type TConcreteFieldProps<T> = IFieldInfo<T>

const StringField: React.FC<TConcreteFieldProps<string>> = ({ label, value }) => {
	return <div>{value}</div>;
};

const TextField: React.FC<TConcreteFieldProps<string>> = ({ label, value }) => {
	return <div>{value}</div>;
};

const EmailField: React.FC<TConcreteFieldProps<string>> = ({ label, value }) => {
	return <div>{value}</div>;
};

const DateField: React.FC<TConcreteFieldProps<string>> = ({ label, value }) => {
	return <div>{value}</div>;
};

const NumberField: React.FC<TConcreteFieldProps<number>> = ({ label, value }) => {
	return <div>{value}</div>;
};

const BooleanField: React.FC<TConcreteFieldProps<boolean>> = ({ label, value }) => {
	return <div>{value}</div>;
};
