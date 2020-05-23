import { Trans } from "react-i18next";
import { useState, useCallback } from "react";
import { Form, Rate, Button, Divider, Alert } from "antd";
import { useApi } from "../../hooks";

import "./styles.less";

type TFormValues = {
  stars?: number;
};

const Stars = () => {
  const [form] = Form.useForm();
  const [showStars, setShowStars] = useState(true);
  const { isLoading: isStarring, callApi } = useApi("PUT", "requestor/action");

  const onFinish = useCallback((values: TFormValues) => {
    (async () => {
      await callApi({ name: "starMaker", num: values.stars });
      setShowStars(false);
    })();
  }, []);

  return (
    <>
      {showStars ? (
        <Form
          form={form}
          onFinish={onFinish}
          layout="inline"
          className="stars-component"
        >
          <Form.Item name="stars">
            <Rate allowClear={false} />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                size="small"
                loading={isStarring}
                disabled={!form.getFieldValue("stars")}
              >
                <Trans i18nKey="send" />
              </Button>
            )}
          </Form.Item>
        </Form>
      ) : (
        <Alert
          closable
          showIcon
          type="info"
          message={<Trans i18nKey="thanks" />}
        />
      )}
      <Divider />
    </>
  );
};

export default Stars;
