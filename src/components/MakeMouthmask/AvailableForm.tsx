import { Form, Input, Button, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useUser, useApi } from "../../hooks";

const { Title } = Typography;

export const AvailableForm = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { user } = useUser();
  const { isLoading: isSettingIsMaker, callApi: setMaskStock } = useApi(
    "PUT",
    "superHero/setMaskStock"
  );

  return (
    <div>
      <Title level={4}>{t("maker.available.label")}</Title>
      <Form
        form={form}
        onFinish={setMaskStock}
        initialValues={{ maskStock: Number(user?.maskStock) }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Form.Item name="maskStock" style={{ display: "inline-block" }}>
          <Input name="maskStock" style={{ marginLeft: 10, width: "40px" }} />
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
