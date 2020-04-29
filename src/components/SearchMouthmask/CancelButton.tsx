import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Typography, Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useApi, useUser } from "../../hooks";

const { confirm } = Modal;
const { Paragraph } = Typography;

type TProps = {
  name: string;
  needsMouthmaskAmount: number;
};

const CancelButton = (props: TProps) => {
  const { t } = useTranslation();
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
          <Paragraph>{t("requestor.contact.cancel.consequences1")}</Paragraph>
          <Paragraph>
            {t("requestor.contact.cancel.consequences2", {
              name,
              count: needsMouthmaskAmount,
            })}
          </Paragraph>
        </Typography>
      ),
      okText: t("yes"),
      okType: "danger",
      cancelText: t("no"),
      onOk: async () => {
        await callApi({ name: "cancel" });
        updateUser({ cancelDate: new Date() });
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
      {t("cancel")}
    </Button>
  );
};

export default CancelButton;
