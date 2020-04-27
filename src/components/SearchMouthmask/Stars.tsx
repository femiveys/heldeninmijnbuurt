import { Form, Rate, Button, Divider, Alert } from "antd";
import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";
import { useApi } from "../../hooks";

import "./styles.less";

type TFormValues = {
  stars?: number;
};

export const Stars = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [showStars, setShowStars] = useState(true);
  const { isLoading: isStarring, callApi: star } = useApi(
    "PUT",
    "requestor/star"
  );

  const onFinish = useCallback((values: TFormValues) => {
    (async () => {
      await star(values);
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
                {t("send")}
              </Button>
            )}
          </Form.Item>
        </Form>
      ) : (
        <Alert message={t("thanks")} type="info" showIcon closable />
      )}
      <Divider />
    </>
  );
};
