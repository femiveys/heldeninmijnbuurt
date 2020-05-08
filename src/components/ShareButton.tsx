import { Button } from "antd";
import { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { share, appName } from "../helpers";

type TProps = {
  style?: CSSProperties;
  text?: string;
};

const ShareButton = ({ style, text }: TProps) => {
  const { t } = useTranslation();

  return (
    <Button
      style={style}
      type="primary"
      size="large"
      onClick={() =>
        share(
          t,
          `Ook jij kan een held worden door het bestaan van ${appName} op sociale media te delen.`
        )
      }
    >
      {text || "Ik laat anderen weten over dit platform"}
    </Button>
  );
};

export default ShareButton;
