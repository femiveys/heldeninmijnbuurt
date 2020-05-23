import { Alert, Typography } from "antd";
import { useTranslation, Trans } from "react-i18next";

type TProps = {
  closable: boolean;
};

const Message = ({ closable }: TProps) => {
  const { t } = useTranslation();

  return (
    <Alert
      type="warning"
      message={t("safetyTitle")}
      closable={closable}
      style={{ textAlign: "left", marginTop: 10 }}
      description={
        <Typography>
          <ul>
            <li>{t("maker.safety.item1")}</li>
            <li>{t("maker.safety.item2")}</li>
            <li>{t("maker.safety.item3")}</li>
            <li>{t("maker.safety.item4")}</li>
          </ul>
          <Trans
            i18nKey="maker.safety.info"
            components={[
              <a href="https://maakjemondmasker.be" target="_blank" />,
            ]}
          />
        </Typography>
      }
    />
  );
};

export default Message;
