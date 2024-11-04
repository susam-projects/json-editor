import { Modal } from 'antd';

type ModalHookAPI = ReturnType<typeof Modal.useModal>[0]

export const confirmDeleteLine = (modal: ModalHookAPI, {
	rowIndex,
	lineIndex,
	onOk,
}: {
	rowIndex: number,
	lineIndex: number,
	onOk: () => void
}) => {
	modal.confirm({
		title: 'Do you want to delete the line?',
		content: `Row ${rowIndex} line ${lineIndex}`,
		onOk,
	});
};
