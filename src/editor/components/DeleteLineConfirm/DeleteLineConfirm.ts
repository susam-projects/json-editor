import { Modal } from 'antd';
import { textEn } from '../../../text';

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
		title: textEn.editorPage.deleteConfirm.title,
		content: textEn.editorPage.deleteConfirm.description(rowIndex, lineIndex),
		onOk,
	});
};
