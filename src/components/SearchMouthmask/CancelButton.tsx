import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { Typography, Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useApi, useUser, useGoto } from "../../hooks";
import { EUserStatus } from "../../types";

const { confirm } = Modal;
const { Paragraph } = Typography;

type TProps = {
  name: string;
  needsMouthmaskAmount: number;
};

const CancelButton = (props: TProps) => {
  const { t } = useTranslation();
  const goto = useGoto();
  const { updateUser } = useUser();
  const { isLoading: isCancelling, callApi } = useApi(
    "PUT",
    "requestor/action"
  );

  const onCancel = useCallback(() => {
    confirm({
      title: t("requestor.contact.cancel.title"),
      icon: <ExclamationCircleOutlined />,
      content: (
        <Typography>
          <Paragraph>
            Dit kan perfect. Misschien heb je via een andere weg mondmaskers
            gevonden of is het gewoon niet meer nodig.
          </Paragraph>
          <Paragraph type="secondary">
            {t("requestor.contact.cancel.consequences1")}
          </Paragraph>
          <Paragraph type="secondary">
            {t("requestor.contact.cancel.consequences2", {
              name,
              count: needsMouthmaskAmount,
            })}
          </Paragraph>
          <Paragraph>Bedankt om ons dit te laten weten.</Paragraph>
        </Typography>
      ),
      okText: t("yes"),
      cancelText: t("no"),
      onOk: async () => {
        await callApi({ name: "cancel" });
        updateUser({ needsMouthmask: false, status: EUserStatus.cancelled });
        await goto();
      },
    });
  }, []);

  const { name, needsMouthmaskAmount } = props;

  return (
    <Button
      danger
      size="small"
      type="link"
      onClick={onCancel}
      loading={isCancelling}
    >
      ik heb geen mondmaskers meer nodig
    </Button>
  );
};

export default CancelButton;
