import { Alert, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

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
            <li>was je handen 60 seconden met zeep</li>
            <li>maak je naai­machine proper</li>
            <li>was je handen opnieuw alvorens verder te werken</li>
            <li>draag tijdens het maken zelf een mondmasker</li>
          </ul>
          <Text>
            Alle info over hoe je een mondmasker maakt, inclusief patronen: 1
            adres:{" "}
            <a href="https://maakjemondmasker.be" target="_blank">
              maakjemondmasker.be
            </a>
          </Text>
        </Typography>
      }
    />
  );
};

export default Message;
