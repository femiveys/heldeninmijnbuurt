import { Card } from "antd";
import { useTranslation } from "react-i18next";
import { Stars } from "./Stars";
import { ThankMessage } from "./ThankMessage";

type TProps = {
  showStars: boolean;
};

export const Appreciation = ({ showStars }: TProps) => {
  const { t } = useTranslation();

  return (
    <Card title={t("requestor.done.rate")}>
      {showStars && <Stars />}
      <ThankMessage />
    </Card>
  );
};
