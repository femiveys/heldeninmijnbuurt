import { useEffect, useState, useCallback } from "react";
import { Form, Button, Row, Col, Select } from "antd";
import { store } from "../store";
import { useApi } from "../base/api/useApi";
import { TStreet, TUser } from "../types";

const getStreetInUserLanguage = (street: TStreet, language = "nl") => {
  switch (language) {
    case "fr":
      return street.streetDescFr || street.streetDescNl || street.streetDescDe;
    case "de":
      return street.streetDescDe || street.streetDescFr || street.streetDescNl;
    default:
      return street.streetDescNl || street.streetDescFr || street.streetDescDe;
  }
};

export const EnterStreet = () => {
  const [form] = Form.useForm();
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
      store.dispatch("user/setUser", me);
    }
  }, [me]);

  const onPostalCodeChange = useCallback((postalCode: number) => {
    setPostalCode(postalCode); // Spijtig dat we de form value niet kunnen gebruiken
    form.resetFields(["streetId"]);
  }, []);

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <Row>
      <Col span={24}>
        <Form
          form={form}
          size="large"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={createMe}
          hideRequiredMark
        >
          <Form.Item
            label="Postnummer"
            name="postalCode"
            hasFeedback={isFetchingPostalCodes}
            validateStatus="validating"
            rules={[
              { required: true, message: "Gelieve je postnummer op te geven!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Geef je postnummer in"
              onChange={onPostalCodeChange}
              filterOption={(input, option) =>
                option?.value.toString().startsWith(input)
              }
            >
              {postalCodes.map((postalCode) => (
                <Select.Option key={postalCode} value={postalCode}>
                  {postalCode}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Straat"
            name="streetId"
            validateStatus="validating"
            hasFeedback={isFetchingStreets}
            rules={[
              { required: true, message: "Gelieve je straat op te geven!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Geef je straat in"
              disabled={!postalCode}
              filterOption={(input, option) =>
                option?.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {streets.map((street) => (
                <Select.Option key={street.id} value={street.id}>
                  {getStreetInUserLanguage(street)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            {...tailLayout}
            validateStatus="validating"
            hasFeedback={isPostingMe}
            shouldUpdate
          >
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={!form.getFieldValue("streetId")}
              >
                Ga verder
              </Button>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
