import { Button, Modal } from "antd";
import { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ShareAltOutlined } from "@ant-design/icons";
import Share from "./Share";

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
      onClick={() => {
        Modal.info({
          title: "Spread the word...",
          icon: <ShareAltOutlined />,
          content: <Share />,
          centered: true,
          maskClosable: true,
          okText: t("close"),
        });
      }}
    >
      {text || "Ik laat anderen weten over dit platform"}
    </Button>
  );
};

export default ShareButton;
