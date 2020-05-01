import { useRouter } from "next/router";
import { SmileOutlined } from "@ant-design/icons";
import { Result, Button, Spin, Typography, Col, Row, Alert } from "antd";
import EnterStreet from "../components/EnterStreet";
import { useUser, useApi } from "../hooks";
import { grid } from "../helpers";
import { useEffect } from "react";
import FullSpinner from "../components/FullSpinner";
import ShareButton from "../components/ShareButton";

const { Paragraph } = Typography;

const style = {
  display: "block",
  margin: "16px auto",
};

export default () => {
  const { user, updateUser } = useUser();
  const { isLoading, callApi } = useApi("PUT", "me/action");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.isMaker) router.replace("/superhero");
      else if (user.needsMouthmask) router.replace("/searching");
      else if (!user.streetId) router.replace("/new");
    }
  }, [user]);

  const userHasCancelled = !!user && !!user.cancelDate;

  // We show a full spinner while redirecting (see above)
  return user ? (
    user.isMaker || user.needsMouthmask || !user.streetId ? (
      <FullSpinner />
    ) : (
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
                  De superhelden zijn zij die zich aan het naaien zetten en een
                  aantal mondmaskers maken voor mensen in hun buurt. Dit moeten
                  er geen honderden zijn. Ook als je maar een aantal mondmaskers
                  kan naaien, help je veel mensen uit de dood. Elke mondmasker
                  telt.
                </Paragraph>
                <Paragraph>
                  Ook als je geen naaimachine hebt, kan je helpen door over dit
                  platform te vertellen. Hoe meer mensen weten dat het bestaat
                  hoe meer superhelden zullen opstaan.
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
                <ShareButton style={style} />
                <Button
                  style={style}
                  disabled={userHasCancelled}
                  onClick={async () => {
                    await callApi({ name: "setNeedsMouthmask" });
                    updateUser({ needsMouthmask: true });
                  }}
                >
                  Ik zoek een mondmasker
                </Button>
                {userHasCancelled && (
                  <Alert
                    message="Je hebt je aanvraag geannuleerd en dus kan je geen nieuwe aanvraag doen."
                    type="warning"
                  />
                )}
                <Spin spinning={isLoading} style={style} />
              </div>
            }
          />
        </Col>
      </Row>
    )
  ) : (
    <EnterStreet />
  );
};
