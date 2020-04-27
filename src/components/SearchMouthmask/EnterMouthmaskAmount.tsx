import { Select, Form, Row, Col, Button } from "antd";
import { Typography } from "antd";
import { useCallback } from "react";
import { useApi, useUser } from "../../hooks";

const { Title } = Typography;

type TFormValues = {
  needsMouthmaskAmount?: number;
};

export const EnterMouthmaskAmount = () => {
  const [form] = Form.useForm();
  const { updateUser, isUpdatingUser } = useUser();
  const { isLoading: isAssigning, callApi: assign } = useApi(
    "PUT",
    "requestor/assign"
  );

  const numberList = [1, 2, 3, 4, 5];

  const onFinish = useCallback(async (values: TFormValues) => {
    await updateUser(values);
    await assign();
  }, []);

  return (
    <Form form={form} size="large" onFinish={onFinish}>
      <Title level={4}>Hoeveel mondmaskers heb je nodig?</Title>
      <Row>
        <Col>
          <Form.Item name="needsMouthmaskAmount">
            <Select>
              {numberList.map((num) => (
                <Select.Option key={num} value={num}>
                  {num}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              loading={isUpdatingUser || isAssigning}
              htmlType="submit"
              disabled={!form.getFieldValue("needsMouthmaskAmount")}
            >
              Ga verder
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
