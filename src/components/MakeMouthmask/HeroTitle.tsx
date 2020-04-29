import { Typography, Space } from "antd";

const { Text } = Typography;

type TProps = {
  numDelivered: number;
};

const HeroTitle = ({ numDelivered }: TProps) => {
  // const { t } = useTranslation();

  // let text: string;
  // if (numDelivered === 0) {
  //   text = t("maker.heroTitle.zero");
  // } else if (numDelivered < 20) {
  //   text = t("maker.heroTitle.few");
  // } else {
  //   text = t("maker.heroTitle.many");
  // }

  return numDelivered ? (
    <Space style={{ paddingLeft: 8 }}>
      <Text style={{ fontSize: 32 }}>{numDelivered}</Text>
      <Text>maskers overhandigd</Text>
    </Space>
  ) : null;
};

export default HeroTitle;
