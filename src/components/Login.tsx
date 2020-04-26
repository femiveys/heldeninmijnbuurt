import { Row, Col, Typography, Button, Space } from "antd";
import firebase from "firebase/app";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

export const Login = () => {
  const { t } = useTranslation();

  return (
    <Row justify="center">
      <Col style={{ maxWidth: "600px" }}>
        <Title>
          Mondmaskers zijn levensredders! Pakt uw naaimachine en word een
          superheld in jouw buurt.
        </Title>
        <Paragraph>
          We hebben jullie allemaal heel hard nodig. Elke held met naaimachine
          kan mondmaskers maken voor de mensen rond zich. Zo is er geen
          verzending nodig en kunnen we efficiënt te werk gaan.
        </Paragraph>
        <Row justify="center">
          <Col>
            <Space size="large">
              <Button
                className="button-google"
                onClick={() => {
                  const provider = new firebase.auth.GoogleAuthProvider();
                  firebase.auth().signInWithPopup(provider);
                }}
              >
                {t("login.google")}
              </Button>
              <Button
                className="button-facebook"
                onClick={() => {
                  const provider = new firebase.auth.FacebookAuthProvider();
                  firebase.auth().signInWithPopup(provider);
                }}
              >
                {t("login.facebook")}
              </Button>
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};