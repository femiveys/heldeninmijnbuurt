import { useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useUser } from "../../base/user";

type TFormValues = {
  maskStock: number;
};

export const AvailableForm = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { updateUser, fetchingUser: isUpdatingUser, user } = useUser();

  const onFinish = useCallback(async (values: TFormValues) => {
    console.log(values);
    await updateUser(values);
  }, []);

  return (
    <Form
      form={form}
      size="large"
      layout="inline"
      onFinish={onFinish}
      colon={false}
      initialValues={{ maskStock: user.maskStock }}
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
            loading={isUpdatingUser}
          >
            {t("update")}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
