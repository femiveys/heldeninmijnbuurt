import { Form, Input, Button, Radio, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import { apiCall } from "../../axios";

const style = {
  display: "block",
  margin: "16px 0",
};

type TProps = {
  relationId: number;
  afterSuccess: () => void;
};

const Problem = ({ relationId, afterSuccess }: TProps) => {
  const [form] = Form.useForm();
  const [isOther, setIsOther] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const { t } = useTranslation();

  const onOk = useCallback(async () => {
    const values = form.getFieldsValue();
    setIsLoading(true);
    await apiCall("PUT", `superhero/problem/${relationId}`, {
      problem: values.other || values.problem,
    });
    setIsLoading(false);
    setVisible(false);
    afterSuccess();
  }, []);

  return (
    <div>
      <Button
        danger
        type="link"
        size="small"
        style={{ fontSize: 10 }}
        onClick={() => setVisible(true)}
      >
        {t("maker.accepted.problem")}
      </Button>

      <Modal
        closable
        maskClosable
        destroyOnClose
        visible={visible}
        title="Welk probleem heb je ondervonden?"
        okText={t("send")}
        onOk={onOk}
        okButtonProps={{ disabled: !enableSubmit }}
        confirmLoading={isLoading}
        onCancel={() => {
          form.resetFields();
          setVisible(false);
        }}
        cancelText={t("cancel")}
      >
        <Form
          form={form}
          size="large"
          onValuesChange={(_, allValues) => {
            setEnableSubmit(true);
            if (allValues.problem === "other") {
              setIsOther(true);
            } else {
              form.setFieldsValue({ other: null });
              setIsOther(false);
            }
          }}
        >
          <Form.Item name="problem">
            <Radio.Group>
              <Radio style={style} value="not able to handover">
                Ik heb de maskers niet kunnen overhandigen
              </Radio>
              <Radio style={style} value="no more mouthmasks">
                Ik heb geen maskers meer
              </Radio>
              <Radio style={style} value="suspicious">
                Verdacht gedrag
              </Radio>
              <Radio style={style} value="other">
                Ander...
              </Radio>
            </Radio.Group>
          </Form.Item>
          {isOther ? (
            <Form.Item name="other">
              <Input
                autoFocus
                style={style}
                maxLength={255}
                placeholder="Beschrijf kort het probleem"
              />
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </div>
  );
};

export default Problem;
