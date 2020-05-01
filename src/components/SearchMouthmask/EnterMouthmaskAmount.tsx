import { Select, Form, Button, Typography, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { grid } from "../../helpers";
import { useApi, useUser } from "../../hooks";
import NotNeededAnymoreButton from "./NotNeededAnymoreButton";

const { Title, Paragraph } = Typography;

type TFormValues = {
  needsMouthmaskAmount?: number;
};

type TProps = {
  fetchRelationStatus: () => Promise<void>;
};

const EnterMouthmaskAmount = ({ fetchRelationStatus }: TProps) => {
  const { t } = useTranslation();
  const { updateUser } = useUser();
  const [form] = Form.useForm();
  const {
    isLoading: isSettingNeedsMouthmaskAmount,
    callApi: setNeedsMouthmaskAmount,
  } = useApi("PUT", "requestor/action");

  const numberList = [1, 2, 3, 4, 5];

  const onFinish = useCallback((values: TFormValues) => {
    const asyncActions = async () => {
      await setNeedsMouthmaskAmount({
        name: "setNeedsMouthmaskAmount",
        num: values.needsMouthmaskAmount,
      });
      updateUser({ needsMouthmaskAmount: values.needsMouthmaskAmount });
      await fetchRelationStatus();
    };
    asyncActions();
  }, []);

  return (
    <Row>
      <Col {...grid}>
        <Typography
          style={{
            maxWidth: 450,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Title level={4} style={{ textAlign: "center" }}>
            {t("requestor.numNeeded.title")}
          </Title>
          <Paragraph>
            We vragen je op te geven hoeveel mondmaskers je nodig hebt. Om het
            voor iedereen wat eerlijk te houden kan je maximaal 5 maskers
            opgeven.
          </Paragraph>
          <Paragraph>Je kan ook maar 1 keer een aanvraag doen.</Paragraph>
          <Paragraph>
            <Form
              form={form}
              size="large"
              onFinish={onFinish}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Form.Item name="needsMouthmaskAmount">
                <Select
                  showArrow={false}
                  style={{ width: 70, textAlign: "center" }}
                  dropdownStyle={{ textAlign: "center" }}
                >
                  {numberList.map((num) => (
                    <Select.Option key={num} value={num}>
                      {num}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    type="primary"
                    loading={isSettingNeedsMouthmaskAmount}
                    htmlType="submit"
                    disabled={!form.getFieldValue("needsMouthmaskAmount")}
                  >
                    Ga verder
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Paragraph>
        </Typography>
        <div style={{ textAlign: "right" }}>
          <NotNeededAnymoreButton />
        </div>
      </Col>
    </Row>
  );
};

export default EnterMouthmaskAmount;
