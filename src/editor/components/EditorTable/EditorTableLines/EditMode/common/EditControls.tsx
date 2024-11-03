import React from 'react';
import { Space } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

type EditControlsProps = {
  onApply: () => void;
  onCancel: () => void;
};

export const EditControls: React.FC<EditControlsProps> = ({ onApply, onCancel }) => {
	return (
		<td className="editor-table__field__controls">
			<Space>
				<CheckOutlined
					className="editor-table__field__apply-icon"
					onClick={onApply}
				/>
				<CloseOutlined
					className="editor-table__field__cancel-icon"
					onClick={onCancel}
				/>
			</Space>
		</td>
	);
};
