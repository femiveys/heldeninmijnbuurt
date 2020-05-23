import { Result, Button, Spin, Typography, Col, Row, Alert } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useUser, useApi } from "../hooks";
import { EUserStatus } from "../types";
import { grid } from "../helpers";
import ShareButton from "../components/ShareButton";
import CommonSteps from "./CommonSteps";
import Reset from "./Reset";
import { Trans } from "react-i18next";

const { Paragraph } = Typography;

const style = {
  display: "block",
  margin: "16px auto",
};

const Choice = () => {
  const { user, updateUser } = useUser();
  const { isLoading, callApi } = useApi("PUT", "me/action");

  const userHasCancelled = user.status === EUserStatus.cancelled;
  const userIsDone = user.status === EUserStatus.done;

  return (
    <Row>
      <Col {...grid} style={{ padding: 16 }}>
        <CommonSteps current={2} />
        <Reset />
        <Result
          icon={
            isLoading ? (
              <Spin size="large" style={{ padding: 17 }} />
            ) : (
              <SmileOutlined />
            )
          }
          title={<Trans i18nKey="choice.title" />}
          subTitle={
            <Typography style={{ textAlign: "left" }}>
              <Paragraph>
                <Trans i18nKey="choice.par1" />
              </Paragraph>
              <Paragraph>
                <Trans i18nKey="choice.par2" />
              </Paragraph>
              <Paragraph>
                <Trans i18nKey="choice.par3" />
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
                <Trans i18nKey="choice.maker" />
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
                <Trans i18nKey="choice.requestor" />
              </Button>
              {userHasCancelled && (
                <Alert
                  type="warning"
                  message={<Trans i18nKey="choice.cancelled" />}
                />
              )}
              {userIsDone && (
                <Alert
                  type="warning"
                  message={<Trans i18nKey="choice.done" />}
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
