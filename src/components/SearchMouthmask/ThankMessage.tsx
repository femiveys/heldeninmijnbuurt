import { Form, Button, Input, Alert } from "antd";
import { useTranslation } from "react-i18next";
import { useApi } from "../../hooks";
import { useCallback, useState } from "react";

const { TextArea } = Input;

const ThankMessage = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [messageStent, setMessageSent] = useState(false);
  const { isLoading, callApi } = useApi("PUT", "requestor/action");

  const thank = useCallback(async (values: { message?: string }) => {
    await callApi({
      name: "thank",
      num: (values.message || "").replace(/\n/g, "<br />"),
    });
    setMessageSent(true);
  }, []);

  return messageStent ? (
    <Alert type="success" message="Bedankt" />
  ) : (
    <Form form={form} size="small" onFinish={thank}>
      <Form.Item name="message">
        <TextArea
          placeholder={t("requestor.done.message.placeholder")}
          autoSize={{ minRows: 3 }}
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={!form.getFieldValue("message")}
          >
            {t("requestor.done.message.send")}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default ThankMessage;
