import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { SmileOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Result, Button, Spin, Typography, Col, Row, Modal } from "antd";
import EnterStreet from "../components/EnterStreet";
import Share from "../components/Share";
import { useUser, useApi } from "../hooks";
import { grid } from "../helpers";

const { Paragraph } = Typography;

const style = {
  display: "block",
  margin: "16px auto",
};

export default () => {
  const { t } = useTranslation();
  const { user, updateUser } = useUser();
  const { isLoading, callApi } = useApi("PUT", "me/action");
  const router = useRouter();

  if (user) {
    if (user.isMaker) router.replace("/superHero");
    else if (user.needsMouthmask) router.replace("/searching");
    else if (!user.streetId) router.replace("/new");
    else {
      return (
        <Row>
          <Col {...grid}>
            <Result
              icon={<SmileOutlined />}
              title="Word een superheld"
              subTitle={
                <Typography style={{ textAlign: "left" }}>
                  <Paragraph>
                    Iedereen zou een mondmasker moeten kunnen hebben. We hebben
                    helden nodig en jij kan een superheld worden.
                  </Paragraph>
                  <Paragraph>
                    De superhelden zijn zij die zich aan het naaien zetten en
                    een aantal mondmaskers maken voor mensen in hun buurt. Dit
                    moeten er geen honderden zijn. Ook als je maar een aantal
                    mondmaskers kan naaien, help je veel mensen uit de dood.
                    Elke mondmasker telt.
                  </Paragraph>
                  <Paragraph>
                    Ook als je geen naaimachine hebt, kan je helpen door over
                    dit platform te vertellen. Hoe meer mensen weten dat het
                    bestaat hoe meer superhelden zullen opstaan.
                  </Paragraph>
                </Typography>
              }
              extra={
                <div>
                  <Button
                    size="large"
                    type="primary"
                    style={style}
                    onClick={async () => {
                      await callApi({ name: "setIsMaker" });
                      updateUser({ isMaker: true });
                    }}
                  >
                    Ik maak mondmaskers
                  </Button>
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
                    Ik laat anderen weten over dit platform
                  </Button>
                  <Button
                    style={style}
                    onClick={async () => {
                      await callApi({ name: "setNeedsMouthmask" });
                      updateUser({ needsMouthmask: true });
                    }}
                  >
                    Ik zoek een mondmasker
                  </Button>
                  <Spin spinning={isLoading} style={style} />
                </div>
              }
            />
          </Col>
        </Row>
      );
    }
  } else {
    return <EnterStreet />;
  }
};
