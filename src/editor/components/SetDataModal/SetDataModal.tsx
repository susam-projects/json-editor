import React from 'react';
import { Input, Modal } from 'antd';
import { textEn } from '../../../text';

interface ISetDataModalProps {
  isOpen: boolean;
  onOk: (data: string) => void;
  onCancel: () => void;
}

type TOnChange = React.ComponentProps<typeof Input.TextArea>['onChange'];

export const SetDataModal: React.FC<ISetDataModalProps> = ({ isOpen, onOk, onCancel }) => {
	const [inputValue, setInputValue] = React.useState('');

	const handleInputChange: TOnChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleOk = () => {
		onOk(inputValue);
		setInputValue('');
	};

	const handleCancel = () => {
		onCancel();
		setInputValue('');
	};

	return (
		<Modal
			title={textEn.editorPage.setDataModalTitle}
			okText={textEn.app.ok}
			cancelText={textEn.app.cancel}
			open={isOpen}
			onOk={handleOk}
			onCancel={handleCancel}
		>
			<Input.TextArea rows={16} value={inputValue} onChange={handleInputChange} />
		</Modal>
	);
};
