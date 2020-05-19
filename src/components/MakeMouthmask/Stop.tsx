import { Button, Typography, Modal } from "antd";
import { useApi, useUser, useGoto } from "../../hooks";
import { useTranslation } from "react-i18next";

const { Paragraph } = Typography;

type TProps = {
  hasPending: boolean;
};

const Stop = ({ hasPending }: TProps) => {
  const goto = useGoto();
  const { t } = useTranslation();
  const { updateUser } = useUser();
  const { callApi } = useApi("PUT", "me/action");

  return (
    <div style={{ textAlign: "right" }}>
      <Button
        type="link"
        size="small"
        style={{ fontSize: 10 }}
        danger
        onClick={() => {
          Modal.confirm({
            title: t("maker.stop.title"),
            content: (
              <Typography>
                <Paragraph>{t("maker.stop.par1")}</Paragraph>
                {hasPending ? (
                  <Paragraph type="secondary">
                    {t("maker.stop.par2")}
                    <br />
                    {t("maker.stop.par3")}
                  </Paragraph>
                ) : (
                  <Paragraph type="secondary">{t("maker.stop.par4")}</Paragraph>
                )}
                <Paragraph>{t("maker.stop.par5")}</Paragraph>
              </Typography>
            ),
            centered: true,
            okText: t("maker.stop.ok"),
            okButtonProps: { danger: true },
            onOk: async () => {
              await callApi({ name: "unsetIsMaker" });
              updateUser({ isMaker: false });
              await goto();
            },
            cancelText: t("maker.stop.cancel"),
          });
        }}
      >
        {t("maker.stop.label")}
      </Button>
    </div>
  );
};

export default Stop;
