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
        <Title level={3}>Mondmaskers zijn levensredders</Title>
        <Title level={4}>
          Neem je naaimachine en word een superheld in je buurt.
        </Title>
        <Paragraph>
          Helden in mijn buurt is een gratis platform dat mensen met een
          naaimachine in <b>contact</b> brengt met mensen <b>in de buurt</b>{" "}
          zonder naaimachine . Zo zou iedereen een zelfgemaakt stoffen
          mondmasker moeten kunnen hebben.
        </Paragraph>
        <Paragraph>
          Ook al kan je maar een aantal mondmaskers naaien, je buurt zal je
          dankbaar zijn. Het ophalen of afleveren kan bvb met de fiets zo is er{" "}
          <b>geen distributie</b> nodig.
        </Paragraph>
        <Paragraph>
          Wij zorgen voor het contact, jullie doen de rest..
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
