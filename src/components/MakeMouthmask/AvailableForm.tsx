import { Form, Button, Typography, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useUser, useApi } from "../../hooks";
import { useCallback } from "react";

const { Title } = Typography;

type TProps = {
  fetchRequested: () => Promise<void>;
};

type TFormValues = {
  maskStock?: number;
};

const AvailableForm = ({ fetchRequested }: TProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { user, updateUser } = useUser();
  const { isLoading: isSettingIsMaker, callApi: setMaskStock } = useApi(
    "PUT",
    "superhero/setMaskStock"
  );

  const updateStock = useCallback(async (values: TFormValues) => {
    await setMaskStock(values); // In the background
    updateUser(values);
    await fetchRequested();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Title level={4}>{t("maker.available.label")}</Title>
      <Form
        form={form}
        size="large"
        onFinish={updateStock}
        initialValues={{ maskStock: Number(user?.maskStock) }}
      >
        <Form.Item name="maskStock">
          <Input
            allowClear
            type="number"
            maxLength={4}
            style={{ width: 90, textAlign: "center", fontSize: 24 }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSettingIsMaker}>
            {t("update")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AvailableForm;
