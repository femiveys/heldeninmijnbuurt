import { Select, Form, Button, Typography } from "antd";
import { useCallback } from "react";
import { useApi, useUser } from "../../hooks";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

type TFormValues = {
  needsMouthmaskAmount?: number;
};

type TProps = {
  fetchSuperHero: () => Promise<void>;
};

const EnterMouthmaskAmount = ({ fetchSuperHero }: TProps) => {
  const { t } = useTranslation();
  const { updateUser } = useUser();
  const [form] = Form.useForm();
  const { isLoading: issettingNeedsMouthmaskAmount, callApi } = useApi(
    "PUT",
    "requestor/action"
  );

  const numberList = [1, 2, 3, 4, 5];

  const onFinish = useCallback((values: TFormValues) => {
    const f = async () => {
      await callApi({
        name: "setNeedsMouthmaskAmount",
        num: values.needsMouthmaskAmount,
      });
      updateUser({ needsMouthmaskAmount: values.needsMouthmaskAmount });
      await fetchSuperHero();
    };
    f();
  }, []);

  return (
    <div>
      <Title level={4}>{t("requestor.numNeeded.title")}</Title>
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
              loading={issettingNeedsMouthmaskAmount}
              htmlType="submit"
              disabled={!form.getFieldValue("needsMouthmaskAmount")}
            >
              Ga verder
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default EnterMouthmaskAmount;
