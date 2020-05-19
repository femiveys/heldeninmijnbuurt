import { Trans } from "react-i18next";
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

const CancelButton = ({ name, needsMouthmaskAmount }: TProps) => {
  const goto = useGoto();
  const { updateUser } = useUser();
  const { isLoading: isCancelling, callApi } = useApi(
    "PUT",
    "requestor/action"
  );

  const onCancel = useCallback(() => {
    confirm({
      title: <Trans i18nKey="requestor.contact.cancel.title" />,
      icon: <ExclamationCircleOutlined />,
      content: (
        <Typography>
          <Paragraph>
            <Trans i18nKey="requestor.contact.cancel.par1" />
          </Paragraph>
          <Paragraph type="secondary">
            <Trans i18nKey="requestor.contact.cancel.consequences1" />
          </Paragraph>
          <Paragraph type="secondary">
            <Trans
              i18nKey="requestor.contact.cancel.consequences2"
              values={{
                name,
                count: needsMouthmaskAmount,
              }}
            />
          </Paragraph>
          <Paragraph>
            <Trans i18nKey="requestor.contact.cancel.par2" />
          </Paragraph>
        </Typography>
      ),
      okText: t("yes"),
      cancelText: t("no"),
      okButtonProps: { danger: true },
      onOk: async () => {
        await callApi({ name: "cancel" });
        updateUser({ needsMouthmask: false, status: EUserStatus.cancelled });
        await goto();
      },
    });
  }, []);

  return (
    <Button
      danger
      size="small"
      type="link"
      onClick={onCancel}
      loading={isCancelling}
    >
      {t("requestor.contact.cancel.label")}
    </Button>
  );
};

export default CancelButton;
