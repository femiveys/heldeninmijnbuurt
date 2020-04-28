import { Form, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useUser, useApi } from "../../hooks";

export const AvailableForm = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { user } = useUser();
  const { isLoading: isSettingIsMaker, callApi: setMaskStock } = useApi(
    "PUT",
    "superHero/setMaskStock"
  );

  return (
    <Form
      form={form}
      size="large"
      layout="inline"
      onFinish={setMaskStock}
      colon={false}
      initialValues={{ maskStock: Number(user?.maskStock) }}
    >
      <Form.Item label={t("maker.available.label")} name="maskStock">
        <Input name="maskStock" style={{ width: "50px" }} />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            size="small"
            loading={isSettingIsMaker}
          >
            {t("update")}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
