import React from "react";
import { Form, Input, Modal, notification, Select, Typography } from "antd";
import { EditorDataLineType } from "../../types/EditorData.ts";
import { textEn } from "../../../text";

export type AddLineData = {
  type: EditorDataLineType;
  label: string;
  value: string;
};

export type AddLineModalOkHandler = (data: AddLineData) => void;

type AddLineModalProps = {
  isOpen: boolean;
  onOk: AddLineModalOkHandler;
  onCancel: () => void;
};

type SelectOptions = React.ComponentProps<typeof Select>["options"];

const SELECT_TYPE_OPTIONS: SelectOptions = [
  { value: EditorDataLineType.Id },
  { value: EditorDataLineType.String },
  { value: EditorDataLineType.Number },
  { value: EditorDataLineType.Email },
  { value: EditorDataLineType.Date },
  { value: EditorDataLineType.Boolean },
  { value: EditorDataLineType.Text },
];

type FormFields = Partial<AddLineData>;

export const AddLineModal: React.FC<AddLineModalProps> = ({
  isOpen,
  onOk,
  onCancel,
}) => {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [form] = Form.useForm<FormFields>();

  const handleOk = () => {
    const values = form.getFieldsValue();
    for (const key in values) {
      if (!values[key as keyof FormFields]) {
        notificationApi.error({
          message: textEn.editorPage.error.newLineValidationError,
        });
        return;
      }
    }
    onOk(values as Required<FormFields>);
  };

  React.useEffect(() => {
    form.resetFields();
  }, [form, isOpen]);

  return (
    <>
      <Modal
        title={textEn.editorPage.addLineModal.title}
        okText={textEn.app.ok}
        cancelText={textEn.app.cancel}
        open={isOpen}
        onOk={handleOk}
        onCancel={onCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item>
            <Typography.Text type="secondary">
              {textEn.editorPage.addLineModal.disclaimer}
            </Typography.Text>
          </Form.Item>
          <Form.Item
            name="type"
            label={textEn.editorPage.addLineModal.typeLabel}
          >
            <Select
              placeholder={textEn.editorPage.addLineModal.typePlaceholder}
              options={SELECT_TYPE_OPTIONS}
            />
          </Form.Item>
          <Form.Item
            name="label"
            label={textEn.editorPage.addLineModal.labelLabel}
          >
            <Input
              placeholder={textEn.editorPage.addLineModal.labelPlaceholder}
            />
          </Form.Item>
          <Form.Item
            name="value"
            label={textEn.editorPage.addLineModal.valueLabel}
          >
            <Input
              placeholder={textEn.editorPage.addLineModal.valuePlaceholder}
            />
          </Form.Item>
        </Form>
      </Modal>
      {notificationContextHolder}
    </>
  );
};
