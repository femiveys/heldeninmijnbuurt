import { Form, Input } from "antd";
import { forceMaxLength } from "../helpers";
import { useTranslation } from "react-i18next";

const MAX_LENGTH = 9;

const WhatsappField = () => {
  const { t } = useTranslation();

  return (
    <Form.Item
      label="WhatsApp"
      name="whatsapp"
      extra="Je zal per mail kunnen communiceren met elkaar, maar vaak is het makkelijker via Whatsapp."
      validateTrigger="onBlur"
      rules={[
        {
          len: MAX_LENGTH,
          message: "Een geldig WhatsApp nummer heeft exact 9 cijfers",
        },
      ]}
    >
      <Input
        min={0}
        minLength={8}
        maxLength={MAX_LENGTH}
        type="number"
        addonBefore="+32"
        placeholder={t("requestor.enterStreet.whatsapp.placeholder")}
        onPaste={(event) => event.preventDefault()}
        onKeyDown={forceMaxLength(MAX_LENGTH)}
      />
    </Form.Item>
  );
};

export default WhatsappField;
