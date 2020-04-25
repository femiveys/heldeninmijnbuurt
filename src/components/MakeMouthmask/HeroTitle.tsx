import { Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

type TProps = {
  numDelivered: number;
};

export const HeroTitle = ({ numDelivered }: TProps) => {
  const { t } = useTranslation();

  let text: string;
  if (numDelivered === 0) {
    text = t("maker.heroTitle.zero");
  } else if (numDelivered < 20) {
    text = t("maker.heroTitle.few");
  } else {
    text = t("maker.heroTitle.many");
  }

  return <Title level={3}>{text}</Title>;
};
