import { Select, Form, Row, Col, Button } from "antd";
import { Typography } from "antd";
import { useUser } from "../../base/user";

const { Title } = Typography;

export const EnterMouthmaskAmount = () => {
  const [form] = Form.useForm();
  const { updateUser, fetchingUser } = useUser();

  const numberList = [1, 2, 3, 4, 5];

  return (
    <Form form={form} size="large" onFinish={updateUser}>
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
          <Form.Item
            shouldUpdate
            validateStatus="validating"
            hasFeedback={fetchingUser}
          >
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={!form.getFieldValue("needsMouthmaskAmount")}
              >
                Ga verder
              </Button>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
