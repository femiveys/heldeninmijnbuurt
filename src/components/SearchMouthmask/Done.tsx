import { Space, Result } from "antd";
import { useTranslation } from "react-i18next";
import Appreciation from "./Appreciation";
import ShareButton from "../ShareButton";

type TProps = {
  needsMouthmaskAmount: number;
  showAppreciation: boolean;
};

const Done = ({ needsMouthmaskAmount, showAppreciation }: TProps) => {
  const { t } = useTranslation();

  return (
    <Result
      status="success"
      title={t("requestor.done.title", { count: needsMouthmaskAmount })}
      subTitle="Nog wat uitleg over waarom delen op FB belangrijk is..."
      extra={[
        <Space
          key="extra"
          direction="vertical"
          size="large"
          style={{ width: "100%" }}
        >
          <ShareButton text="Deel op sociale media" />
          {showAppreciation && <Appreciation showStars={false} />}
        </Space>,
      ]}
    />
  );
};

export default Done;
