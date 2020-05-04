import { Row, Col, Typography, Button, Space } from "antd";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import firebase from "firebase/app";
import { useTranslation } from "react-i18next";
import GlobalStats from "./GlobalStats";

const { Title, Paragraph } = Typography;

const Login = () => {
  const { t } = useTranslation();

  return (
    <Row justify="center" style={{ padding: 32 }}>
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
        <GlobalStats />
        <Row justify="center">
          <Col>
            <Space size="large">
              <Button
                size="large"
                icon={<GoogleOutlined />}
                style={{ backgroundColor: "#de5246", color: "white" }}
                onClick={() => {
                  const provider = new firebase.auth.GoogleAuthProvider();
                  firebase.auth().signInWithPopup(provider);
                }}
              >
                {t("login.google")}
              </Button>
              {/*

  <Button
  size="large"
  icon={<FacebookOutlined />}
  style={{ backgroundColor: "#3b5998", color: "white" }}
  onClick={() => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }}
  >
  {t("login.facebook")}
  </Button>
*/}
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
