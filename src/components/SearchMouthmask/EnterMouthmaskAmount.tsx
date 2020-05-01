import { Select, Form, Button, Typography, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { grid } from "../../helpers";
import { useApi, useUser } from "../../hooks";

const { Title, Paragraph } = Typography;

type TFormValues = {
  needsMouthmaskAmount?: number;
};

type TProps = {
  fetchSuperHero: () => Promise<void>;
};

const EnterMouthmaskAmount = ({ fetchSuperHero }: TProps) => {
  const { t } = useTranslation();
  const { updateUser } = useUser();
  const router = useRouter();
  const [form] = Form.useForm();
  const {
    isLoading: isSettingNeedsMouthmaskAmount,
    callApi: setNeedsMouthmaskAmount,
  } = useApi("PUT", "requestor/action");
  const {
    isLoading: isUnsettingNeedsMouthmask,
    callApi: unsetNeedsMouthmask,
  } = useApi("PUT", "me/action");

  const numberList = [1, 2, 3, 4, 5];

  const onFinish = useCallback((values: TFormValues) => {
    const asyncActions = async () => {
      await setNeedsMouthmaskAmount({
        name: "setNeedsMouthmaskAmount",
        num: values.needsMouthmaskAmount,
      });
      updateUser({ needsMouthmaskAmount: values.needsMouthmaskAmount });
      await fetchSuperHero();
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
          <Button
            danger
            type="link"
            loading={isUnsettingNeedsMouthmask}
            onClick={async () => {
              await unsetNeedsMouthmask({ name: "unsetNeedsMouthmask" });
              updateUser({ needsMouthmask: false });
              router.replace("/");
            }}
          >
            Ik heb toch geen mondmaskers meer nodig
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default EnterMouthmaskAmount;
