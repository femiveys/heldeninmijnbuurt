import { Form, Button, Row, Col, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { grid, contactEmail } from "../helpers";
import WhatsappField from "./WhatsappField";
import { useApi, useUser, useGoto } from "../hooks";
import { useCallback } from "react";
import { pick } from "lodash";

const { Paragraph, Title } = Typography;

type TFormValues = {
  name?: string;
  whatsapp?: string;
};

const ProfileForm = () => {
  const [form] = Form.useForm();
  const goto = useGoto();
  const { t } = useTranslation();
  const { user, updateUser } = useUser();
  const { isLoading, callApi } = useApi("PUT", "me");

  const updateMe = useCallback(async (fields: TFormValues) => {
    await callApi({ fields });
    updateUser(fields);
    goto();
  }, []);

  if (!user) return null;

  return (
    <Row>
      <Col {...grid} style={{ padding: 32 }}>
        <Typography>
          <Title level={4}>Pas je profielgevens aan</Title>
          <Paragraph type="secondary">
            Aangezien mensen niet snel verhuizen en we maskershoppen willen
            vermijden, is het hier niet mogelijk je straat aan te passen. Indien
            je dit toch zou willen, gelieve ons een{" "}
            <a href={`mailto:${contactEmail}`} target="_blank">
              mail
            </a>{" "}
            te sturen.
          </Paragraph>
        </Typography>
        <Form
          form={form}
          size="large"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          onFinish={updateMe}
          initialValues={pick(user, "name", "whatsapp")}
        >
          <Form.Item
            name="name"
            label="Naam"
            extra="De naam die de ander zal zien"
            rules={[{ required: true, message: "Je naam mag niet leeg zijn" }]}
          >
            <Input />
          </Form.Item>
          <WhatsappField />
          <Form.Item
            shouldUpdate
            wrapperCol={{ xs: { offset: 0 }, sm: { offset: 8 } }}
          >
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={isLoading || !form.getFieldValue("name")}
                loading={isLoading}
              >
                {t("update")}
              </Button>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileForm;
