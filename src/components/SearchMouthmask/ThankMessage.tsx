import { Form, Button, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useApi } from "../../hooks";

const { TextArea } = Input;

export const ThankMessage = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { isLoading: isStarring, callApi: star } = useApi(
    "PUT",
    "requestor/star"
  );

  return (
    <Form form={form} size="small" onFinish={star}>
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
            loading={isStarring}
            disabled={!form.getFieldValue("message")}
          >
            {t("requestor.done.message.send")}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
