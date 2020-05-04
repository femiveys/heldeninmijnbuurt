import { useEffect, useState, useCallback } from "react";
import { Form, Button, Row, Col, Select, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useApi, useUser, useAuth } from "../hooks";
import { TStreet, TUser } from "../types";
import { grid, getStreetInUserLanguage, forceMaxLength } from "../helpers";
import CommonSteps from "./CommonSteps";
import postalCodes from "./postalCodes";

const { Title, Paragraph } = Typography;

const MAX_LENGTH = 9;

const EnterStreet = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { updateUser } = useUser();
  const { firebaseUser } = useAuth();
  const [postalCode, setPostalCode] = useState<number>();
  const {
    data: streets,
    isLoading: isFetchingStreets,
    callApi: fetchStreets,
  } = useApi<TStreet[]>("GET", `streets/${postalCode}`, []);
  const { data: me, isLoading: isPostingMe, callApi: createMe } = useApi<TUser>(
    "POST",
    "me"
  );

  useEffect(() => {
    if (postalCode) {
      fetchStreets();
      fixAutocomplete();
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
        <CommonSteps current={1} />
        <Typography style={{ paddingTop: 16 }}>
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
              {postalCodes.map((postalCode) => (
                <Select.Option
                  key={postalCode}
                  value={postalCode}
                  style={{ padding: 8 }}
                >
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
                <Select.Option
                  key={street.id}
                  value={street.id}
                  style={{ padding: 8 }}
                >
                  {getStreetInUserLanguage(street)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="WhatsApp"
            name="whatsapp"
            extra="Je zal per mail kunnen communiceren met elkaar, maar vaak is het makkelijker via Whatsapp."
            validateTrigger="onBlur"
            rules={[
              {
                len: MAX_LENGTH,
                message: "Een geldig WhatsApp nummer heeft exact 9 cijfers",
              },
            ]}
          >
            <Input
              min={0}
              minLength={8}
              maxLength={MAX_LENGTH}
              type="number"
              addonBefore="+32"
              placeholder={t("requestor.enterStreet.whatsapp.placeholder")}
              onPaste={(event) => event.preventDefault()}
              onKeyDown={forceMaxLength(MAX_LENGTH)}
            />
          </Form.Item>

          <Form.Item
            shouldUpdate
            wrapperCol={{ xs: { offset: 0 }, sm: { offset: 8 } }}
          >
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

// Dirty hack
// https://github.com/ant-design/ant-design/issues/7659#issuecomment-580688874
const fixAutocomplete = () => {
  document.querySelectorAll(".ant-select-selector input").forEach((e) => {
    e.setAttribute("autocomplete", "stopDamnAutocomplete");
    //you can put any value but NOT "off" or "false" because they DO NOT works
  });
};

export default EnterStreet;
