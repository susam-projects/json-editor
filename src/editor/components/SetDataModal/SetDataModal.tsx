import React, { useEffect } from 'react';
import { Input, Modal } from 'antd';
import { textEn } from '../../../text';

interface SetDataModalProps {
  isOpen: boolean;
  onOk: (data: string) => void;
  onCancel: () => void;
}

type TOnChange = React.ComponentProps<typeof Input.TextArea>['onChange'];

export const SetDataModal: React.FC<SetDataModalProps> = ({ isOpen, onOk, onCancel }) => {
	const [inputValue, setInputValue] = React.useState('');

	useEffect(() => {
		setInputValue('');
	}, [isOpen]);

	const handleInputChange: TOnChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleOk = () => {
		onOk(inputValue);
	};

	return (
		<Modal
			title={textEn.editorPage.setDataModalTitle}
			okText={textEn.app.ok}
			cancelText={textEn.app.cancel}
			open={isOpen}
			onOk={handleOk}
			onCancel={onCancel}
		>
			<Input.TextArea
				rows={16}
				placeholder={textEn.editorPage.setDataPlaceholder}
				value={inputValue}
				onChange={handleInputChange}
			/>
		</Modal>
	);
};
