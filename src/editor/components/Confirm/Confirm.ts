import { Modal } from 'antd';
import { textEn } from '../../../text';

type ModalHookAPI = ReturnType<typeof Modal.useModal>[0];

export const confirmDeleteRow = (modal: ModalHookAPI, {
	rowIndex,
	onOk,
}: {
	rowIndex: number,
	onOk: () => void
}) => {
	modal.confirm({
		title: textEn.editorPage.deleteRowConfirm.title,
		content: textEn.editorPage.deleteRowConfirm.description(rowIndex),
		onOk,
	});
};

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
		title: textEn.editorPage.deleteLineConfirm.title,
		content: textEn.editorPage.deleteLineConfirm.description(rowIndex, lineIndex),
		onOk,
	});
};
