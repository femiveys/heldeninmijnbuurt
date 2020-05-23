import { Select, Form, Button, Typography, Col, Row } from "antd";
import { Trans } from "react-i18next";
import { useCallback } from "react";
import { grid } from "../../helpers";
import { useApi, useUser } from "../../hooks";
import NotNeededAnymoreButton from "./NotNeededAnymoreButton";
import SearchSteps from "./SearchSteps";

const { Title, Paragraph } = Typography;

const fontSize = {
  fontSize: 16,
};

type TFormValues = {
  needsMouthmaskAmount?: number;
};

type TProps = {
  fetchRelationStatus: () => Promise<void>;
};

const EnterMouthmaskAmount = ({ fetchRelationStatus }: TProps) => {
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
        <SearchSteps current={0} />
        <div style={{ padding: 16 }}>
          <Typography
            style={{
              maxWidth: 450,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Title level={4} style={{ textAlign: "center" }}>
              <Trans i18nKey="requestor.numNeeded.title" />
            </Title>
            <Paragraph>
              <Trans i18nKey="requestor.numNeeded.par1" />
            </Paragraph>
            <Paragraph>
              <Trans i18nKey="requestor.numNeeded.par2" />
            </Paragraph>
            <Paragraph>
              <Form
                form={form}
                size="large"
                style={{ display: "flex", justifyContent: "center" }}
                initialValues={{ needsMouthmaskAmount: 1 }}
                onFinish={onFinish}
              >
                <Form.Item name="needsMouthmaskAmount">
                  <Select
                    showArrow={false}
                    style={{ width: 70, textAlign: "center", ...fontSize }}
                    dropdownStyle={{ textAlign: "center" }}
                  >
                    {numberList.map((num) => (
                      <Select.Option key={num} value={num} style={fontSize}>
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
                      <Trans i18nKey="next" />
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </Paragraph>
          </Typography>
        </div>
        <div style={{ textAlign: "right" }}>
          <NotNeededAnymoreButton />
        </div>
      </Col>
    </Row>
  );
};

export default EnterMouthmaskAmount;
