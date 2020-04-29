import { Form, Input, Button, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useUser, useApi } from "../../hooks";
import { useCallback } from "react";

const { Title } = Typography;

type TFormValues = {
  maskStock?: number;
};

const AvailableForm = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { user, updateUser } = useUser();
  const { isLoading: isSettingIsMaker, callApi: setMaskStock } = useApi(
    "PUT",
    "superhero/setMaskStock"
  );

  const updateStock = useCallback(async (values: TFormValues) => {
    await setMaskStock(values);
    updateUser(values);
  }, []);

  return (
    <div>
      <Title level={4} style={{ textAlign: "center" }}>
        {t("maker.available.label")}
      </Title>
      <Form
        form={form}
        onFinish={updateStock}
        initialValues={{ maskStock: Number(user?.maskStock) }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Form.Item name="maskStock" style={{ display: "inline-block" }}>
          <Input style={{ width: 40 }} />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button type="primary" htmlType="submit" loading={isSettingIsMaker}>
              {t("update")}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AvailableForm;
