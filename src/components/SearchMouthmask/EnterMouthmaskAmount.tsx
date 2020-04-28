import { Select, Form, Button } from "antd";
import { useCallback } from "react";
import { useApi, useUser } from "../../hooks";

type TFormValues = {
  needsMouthmaskAmount?: number;
};

type TProps = {
  fetchSuperHero: () => Promise<void>;
};

export const EnterMouthmaskAmount = ({ fetchSuperHero }: TProps) => {
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
    <Form form={form} size="large" onFinish={onFinish} layout="inline">
      <Form.Item
        label="Hoeveel mondmaskers heb je nodig?"
        name="needsMouthmaskAmount"
      >
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
  );
};
