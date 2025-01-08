import React from "react";
import {
  AddRowHandler,
  DeleteRowHandler,
  Editor,
} from "../components/Editor/Editor.tsx";
import { Button, Modal, notification, Space, Typography } from "antd";
import { Page } from "../../layout";
import { useStyles } from "./EditorPage.styles.ts";
import { textEn } from "../../text";
import { SetDataModal } from "../components/SetDataModal/SetDataModal.tsx";
import {
  confirmDeleteLine,
  confirmDeleteRow,
} from "../components/Confirm/Confirm.ts";
import {
  AddLineHandler,
  ChangeLineHandler,
  DeleteLineHandler,
} from "../components/EditorList/EditorListLine/EditorListLine.tsx";
import { useModal } from "../../utils/useModal.ts";
import {
  AddLineModal,
  AddLineModalOkHandler,
} from "../components/AddLineModal/AddLineModal.tsx";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  addLine,
  addRow,
  deleteLine,
  deleteRow,
  selectEditorData,
  setData,
  updateLine,
} from "../store/editorPageSlice.ts";
import { downloadEditorData } from "../service/dataDownloader.service.ts";

const useJsonData = () => {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectEditorData);

  const {
    isOpen: isSetDataModalOpen,
    open: openSetDataModal,
    close: closeSetDataModal,
  } = useModal();

  const handleSetDataCancel = () => {
    closeSetDataModal();
  };

  const handleSetData = (newData: string) => {
    try {
      const newDataObjects: unknown = JSON.parse(newData);
      if (Array.isArray(newDataObjects)) {
        // should be properly checked, but making it simple for this test task
        dispatch(setData({ newDataObjects }));
      }
    } catch (error) {
      notificationApi.error({
        message: textEn.editorPage.error.errorParsingData,
        description: String(error),
      });
    }
    closeSetDataModal();
  };

  const handleDownloadData = () => {
    downloadEditorData(data);
  };

  return {
    data,
    isSetDataModalOpen,
    openSetDataModal,
    handleSetDataCancel,
    handleSetData,
    handleDownloadData,
    notificationContextHolder,
  };
};

const useAddLineModal = () => {
  const dispatch = useAppDispatch();
  const [rowIndex, setRowIndex] = React.useState(-1);
  const [prevLineIndex, setPrevLineIndex] = React.useState(-1);

  const { isOpen: isAddLineModalOpen, open, close } = useModal();

  const handleAddModalCancel = () => {
    close();
  };

  const handleAddModalOk: AddLineModalOkHandler = (data) => {
    dispatch(addLine({ rowIndex, prevLineIndex, data }));
    close();
  };

  const openAddLineModal = React.useCallback(
    (rowIndex: number, prevLineIndex: number) => {
      setRowIndex(rowIndex);
      setPrevLineIndex(prevLineIndex);
      open();
    },
    [open],
  );

  return {
    handleAddModalOk,
    handleAddModalCancel,
    isAddLineModalOpen,
    openAddLineModal,
  };
};

type OpenAddLineModal = ReturnType<typeof useAddLineModal>["openAddLineModal"];

const useJsonEditor = (openAddLineModal: OpenAddLineModal) => {
  const dispatch = useAppDispatch();
  const [modal, modalContextHolder] = Modal.useModal();

  const handleAddRow = React.useCallback<AddRowHandler>(
    (prevRowIndex) => {
      dispatch(addRow({ prevRowIndex }));
    },
    [dispatch],
  );

  const handleDeleteRow = React.useCallback<DeleteRowHandler>(
    (rowIndex) => {
      return new Promise((resolve) => {
        confirmDeleteRow(modal, {
          rowIndex,
          onOk: () => {
            dispatch(deleteRow({ rowIndex }));
            resolve();
          },
        });
      });
    },
    [dispatch, modal],
  );

  const handleAddLine = React.useCallback<AddLineHandler>(
    (rowIndex, prevLineIndex) => {
      openAddLineModal(rowIndex, prevLineIndex);
    },
    [openAddLineModal],
  );

  const handleLineChange = React.useCallback<ChangeLineHandler>(
    (rowIndex, lineIndex, newValue) => {
      dispatch(updateLine({ rowIndex, lineIndex, newValue }));
    },
    [dispatch],
  );

  const handleDeleteLine = React.useCallback<DeleteLineHandler>(
    (rowIndex, lineIndex) => {
      confirmDeleteLine(modal, {
        rowIndex,
        lineIndex,
        onOk: () => {
          dispatch(deleteLine({ rowIndex, lineIndex }));
        },
      });
    },
    [dispatch, modal],
  );

  return {
    handleAddRow,
    handleDeleteRow,
    handleAddLine,
    handleLineChange,
    handleDeleteLine,
    modalContextHolder,
  };
};

export const EditorPage: React.FC = () => {
  const { styles } = useStyles();

  const {
    data,
    isSetDataModalOpen,
    openSetDataModal,
    handleSetDataCancel,
    handleSetData,
    handleDownloadData,
    notificationContextHolder,
  } = useJsonData();

  const {
    isAddLineModalOpen,
    handleAddModalCancel,
    handleAddModalOk,
    openAddLineModal,
  } = useAddLineModal();

  const {
    handleAddRow,
    handleDeleteRow,
    handleAddLine,
    handleLineChange,
    handleDeleteLine,
    modalContextHolder,
  } = useJsonEditor(openAddLineModal);

  return (
    <Page>
      <Space direction="vertical" size="large" className={styles.verticalSpace}>
        <Space
          direction="vertical"
          size="small"
          className={styles.verticalSpace}
        >
          <Typography.Title className={styles.title}>
            {textEn.editorPage.title}
          </Typography.Title>
          <Typography.Text className={styles.subtitle}>
            {textEn.editorPage.subTitle}
          </Typography.Text>
        </Space>
        <Space>
          <Button type="primary" onClick={openSetDataModal}>
            {textEn.editorPage.setDataButton}
          </Button>
          <Button onClick={handleDownloadData}>
            {textEn.editorPage.downloadDataButton}
          </Button>
        </Space>
        <Editor
          data={data}
          onAddRow={handleAddRow}
          onDeleteRow={handleDeleteRow}
          onAddLine={handleAddLine}
          onChangeLine={handleLineChange}
          onDeleteLine={handleDeleteLine}
        />
      </Space>
      <SetDataModal
        isOpen={isSetDataModalOpen}
        onOk={handleSetData}
        onCancel={handleSetDataCancel}
      />
      <AddLineModal
        isOpen={isAddLineModalOpen}
        onOk={handleAddModalOk}
        onCancel={handleAddModalCancel}
      />
      {modalContextHolder}
      {notificationContextHolder}
    </Page>
  );
};
