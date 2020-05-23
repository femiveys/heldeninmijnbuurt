import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import AvailableForm from "./AvailableForm";

const { Title, Paragraph } = Typography;

type TProps = {
  fetchRequested: () => Promise<void>;
};

const EnterStock = ({ fetchRequested }: TProps) => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: 32 }}>
      <Typography>
        <Title level={4}>{t("maker.enter.title")}</Title>
        <Paragraph>{t("maker.enter.par1")}</Paragraph>
        <Paragraph>
          {t("maker.enter.par2")}
          <br />
          {t("maker.enter.par3")}
          <br />
          {t("maker.enter.par4")}
        </Paragraph>
        <Paragraph>{t("maker.enter.par5")}</Paragraph>
        <Paragraph>{t("maker.enter.par6")}</Paragraph>
        <Paragraph>{t("maker.enter.par7")}</Paragraph>
      </Typography>
      <AvailableForm fetchRequested={fetchRequested} />
    </div>
  );
};

export default EnterStock;
