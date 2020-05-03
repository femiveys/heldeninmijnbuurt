import { useEffect, useState, useCallback } from "react";
import { Form, Button, Row, Col, Select, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useApi, useUser, useAuth } from "../hooks";
import { TStreet, TUser } from "../types";
import { grid, getStreetInUserLanguage } from "../helpers";

const { Title, Paragraph } = Typography;

const EnterStreet = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { updateUser } = useUser();
  const { firebaseUser } = useAuth();
  const [postalCode, setPostalCode] = useState<number>();
  const {
    data: postalCodes,
    isLoading: isFetchingPostalCodes,
    callApi: fetchPostalCodes,
  } = useApi<number[]>("GET", "postalCodes", []);
  const {
    data: streets,
    isLoading: isFetchingStreets,
    callApi: fetchStreets,
  } = useApi<TStreet[]>("GET", `streets/${postalCode}`, []);
  const { data: me, isLoading: isPostingMe, callApi: createMe } = useApi<TUser>(
    "POST",
    "me"
  );

  // TODO postalCodes could be taken from a static JSON or localstorage
  useEffect(() => {
    fetchPostalCodes();
  }, []);

  useEffect(() => {
    if (postalCode) {
      fetchStreets();
    }
  }, [postalCode]);

  useEffect(() => {
    if (me) {
      updateUser(me);
    }
  }, [me]);

  const onPostalCodeChange = useCallback((postalCode: number) => {
    setPostalCode(postalCode); // Spijtig dat we de form value niet kunnen gebruiken
    form.resetFields(["streetId"]);
  }, []);

  return (
    <Row>
      <Col {...grid} style={{ padding: 16 }}>
        <Typography>
          <Title level={4}>In welke buurt woon je?</Title>
          <Paragraph>
            {firebaseUser?.displayName}, gelieve ons te laten weten in welke
            buurt je woont. Zo kunnen we mensen die mondmaskers zoeken,
            samenbrengen met superhelden, die mondmaskers maken.
          </Paragraph>
        </Typography>
        <Form
          form={form}
          size="large"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          onFinish={createMe}
        >
          <Form.Item
            label={t("requestor.enterStreet.postalCode.label")}
            name="postalCode"
            hasFeedback={isFetchingPostalCodes}
            validateStatus="validating"
            rules={[
              {
                required: true,
                message: t("requestor.enterStreet.postalCode.error"),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={t("requestor.enterStreet.postalCode.placeholder")}
              onChange={onPostalCodeChange}
              filterOption={(input, option) =>
                option?.value.toString().startsWith(input)
              }
            >
              {postalCodes?.map((postalCode) => (
                <Select.Option key={postalCode} value={postalCode}>
                  {postalCode}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={t("requestor.enterStreet.street.label")}
            name="streetId"
            validateStatus="validating"
            hasFeedback={isFetchingStreets}
            extra="Niemand zal ooit je straat zien. We gebruiken dit enkel om mensen in elkaars buurt samen te brengen."
            rules={[
              {
                required: true,
                message: t("requestor.enterStreet.street.error"),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={t("requestor.enterStreet.street.placeholder")}
              disabled={!postalCode}
              filterOption={(input, option) =>
                option?.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {streets?.map((street) => (
                <Select.Option key={street.id} value={street.id}>
                  {getStreetInUserLanguage(street)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="WhatsApp"
            name="whatsapp"
            extra="Je zal per mail kunnen communiceren met elkaar, maar vaak is het makkelijker via Whatsapp."
          >
            <Input
              maxLength={9}
              type="number"
              addonBefore="+32"
              placeholder={t("requestor.enterStreet.whatsapp.placeholder")}
            />
          </Form.Item>

          <Form.Item shouldUpdate style={{ textAlign: "center" }}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={!form.getFieldValue("streetId")}
                loading={isPostingMe}
              >
                {t("next")}
              </Button>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default EnterStreet;
