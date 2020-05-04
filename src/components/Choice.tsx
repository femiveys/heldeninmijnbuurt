import { SmileOutlined } from "@ant-design/icons";
import { Result, Button, Spin, Typography, Col, Row, Alert } from "antd";
import { useUser, useApi } from "../hooks";
import { grid } from "../helpers";
import ShareButton from "../components/ShareButton";
import { EUserStatus } from "../types";
import CommonSteps from "./CommonSteps";

const { Paragraph } = Typography;

const style = {
  display: "block",
  margin: "16px auto",
};

const Choice = () => {
  const { user, updateUser } = useUser();
  const { isLoading, callApi } = useApi("PUT", "me/action");

  const userHasCancelled = !!user && user.status === EUserStatus.cancelled;
  const userIsDone = !!user && user.status === EUserStatus.done;

  return (
    <Row>
      <Col {...grid} style={{ padding: 16 }}>
        <CommonSteps current={2} />
        <Result
          icon={
            isLoading ? (
              <Spin size="large" style={{ padding: 17 }} />
            ) : (
              <SmileOutlined />
            )
          }
          title="Word een superheld"
          subTitle={
            <Typography style={{ textAlign: "left" }}>
              <Paragraph>
                Iedereen zou een mondmasker moeten kunnen hebben. We hebben
                helden nodig en jij kan een superheld worden.
              </Paragraph>
              <Paragraph>
                De superhelden zijn zij die zich aan het naaien zetten en een
                aantal mondmaskers maken voor mensen in hun buurt. Dit moeten er
                geen honderden zijn. Ook als je maar een aantal mondmaskers kan
                naaien, help je veel mensen uit de dood. Elke mondmasker telt.
              </Paragraph>
              <Paragraph>
                Ook als je geen naaimachine hebt, kan je helpen door over dit
                platform te vertellen. Hoe meer mensen weten dat het bestaat hoe
                meer superhelden zullen opstaan.
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
                disabled={userHasCancelled || userIsDone}
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
              {userIsDone && (
                <Alert
                  message="Je hebt je mondmaskers al ontvangen, dus kan je geen nieuwe aanvraag doen."
                  type="warning"
                />
              )}
            </div>
          }
        />
      </Col>
    </Row>
  );
};

export default Choice;
