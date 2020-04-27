import { Button, Space, Result } from "antd";
import { useTranslation } from "react-i18next";
import { notImplemented } from "../../helpers";
import { Appreciation } from "./Appreciation";

type TProps = {
  needsMouthmaskAmount: number;
  showStars: boolean;
};

export const Done = ({ needsMouthmaskAmount, showStars }: TProps) => {
  const { t } = useTranslation();

  return (
    <Result
      status="success"
      title={t("requestor.done.title", { count: needsMouthmaskAmount })}
      subTitle="Nog wat uitleg over waarom delen op FB belangrijk is..."
      extra={[
        <Space key="extra" direction="vertical" size="large">
          <Button type="primary" onClick={() => notImplemented()}>
            {t("requestor.done.share.facebook")}
          </Button>
          <Appreciation showStars={showStars} />
        </Space>,
      ]}
    />
  );
};
