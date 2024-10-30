import React, { ChangeEventHandler } from 'react';
import dayjs from 'dayjs';
import { CheckOutlined, CloseOutlined, FormOutlined } from '@ant-design/icons';
import {
	IFieldInfo, isBoolean, isDate, isEmail, isId, isNumber, isString, isText,
} from '../../service/fieldTypes.service.ts';
import { useStyles } from './EditorField.styles.ts';
import { Space } from 'antd';

interface IFieldProps {
  field: IFieldInfo<unknown>;
}

export const EditorField: React.FC<IFieldProps> = ({ field }) => {
	if (isId(field)) {
		return null;
	}
	if (isBoolean(field)) {
		return <BooleanField {...field as TConcreteFieldProps<boolean>} />;
	}
	if (isNumber(field)) {
		return <NumberField {...field as TConcreteFieldProps<number>} />;
	}
	if (isEmail(field)) {
		return <EmailField {...field as TConcreteFieldProps<string>} />;
	}
	if (isDate(field)) {
		return <DateField {...field as TConcreteFieldProps<string>} />;
	}
	if (isText(field)) {
		return <TextField {...field as TConcreteFieldProps<string>} />;
	}
	if (isString(field)) {
		return <StringField {...field as TConcreteFieldProps<string>} />;
	}
	return null;
};

type TConcreteFieldProps<T> = IFieldInfo<T>;

function useFieldValue<T>(defaultValue: T) {
	const [value, setValue] = React.useState(defaultValue);
	const [isEdit, setIsEdit] = React.useState(false);

	const handleEditClick = () => {
		setIsEdit(true);
	};

	const handleApply = (newValue: T) => {
		setValue(newValue);
		setIsEdit(false);
	};

	const handleCancel = () => {
		setIsEdit(false);
	};

	return {
		value,
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	};
}

const StringField: React.FC<TConcreteFieldProps<string>> = ({ label, value: defaultValue }) => {
	const { styles } = useStyles();
	const {
		value,
		isEdit,
		handleEditClick,
		handleApply,
		handleCancel,
	} = useFieldValue(defaultValue);

	const [editValue, setEditValue] = React.useState('');

	React.useEffect(() => {
		setEditValue(value);
	}, [isEdit, value]);

	const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setEditValue(event.target.value);
	};

	return (
		isEdit ? (
			<tr>
				<td>
					{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
					<label>{label}</label>
				</td>
				{/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
				<td className={styles.fieldEditValue}>
					<input value={editValue} onChange={handleInputChange} />
				</td>
				<td>
					<Space>
						<CheckOutlined className={styles.applyIcon} onClick={() => handleApply(editValue)} />
						<CloseOutlined className={styles.cancelIcon} onClick={handleCancel} />
					</Space>
				</td>
			</tr>
		) : (
			<tr className={styles.field}>
				<td>{label}</td>
				<td className={styles.fieldValue}>{value}</td>
				<td className={styles.editIcon} onClick={handleEditClick}>
					<FormOutlined />
				</td>
			</tr>
		)
	);
};

const TextField: React.FC<TConcreteFieldProps<string>> = ({ label, value }) => {
	const { styles } = useStyles();

	return (
		<tr className={styles.field}>
			<td>{label}</td>
			<td className={styles.fieldValue}>{value}</td>
			<td className={styles.editIcon}><FormOutlined /></td>
		</tr>
	);
};

const EmailField: React.FC<TConcreteFieldProps<string>> = ({ label, value }) => {
	const { styles } = useStyles();

	return (
		<tr className={styles.field}>
			<td>{label}</td>
			<td className={styles.fieldValue}>{value}</td>
			<td className={styles.editIcon}><FormOutlined /></td>
		</tr>
	);
};

const DATE_FORMAT = 'DD/MM/YYYY';
const DateField: React.FC<TConcreteFieldProps<string>> = ({ label, value }) => {
	const { styles } = useStyles();

	const formattedValue = dayjs(value).format(DATE_FORMAT);

	return (
		<tr className={styles.field}>
			<td>{label}</td>
			<td className={styles.fieldValue}>{formattedValue}</td>
			<td className={styles.editIcon}><FormOutlined /></td>
		</tr>
	);
};

const NumberField: React.FC<TConcreteFieldProps<number>> = ({ label, value }) => {
	const { styles } = useStyles();

	return (
		<tr className={styles.field}>
			<td>{label}</td>
			<td className={styles.fieldValue}>{value}</td>
			<td className={styles.editIcon}><FormOutlined /></td>
		</tr>
	);
};

const BooleanField: React.FC<TConcreteFieldProps<boolean>> = ({ label, value }) => {
	const { styles } = useStyles();

	return (
		<tr className={styles.field}>
			<td>{label}</td>
			<td className={styles.fieldValue}>{String(value)}</td>
			<td className={styles.editIcon}><FormOutlined /></td>
		</tr>
	);
};
