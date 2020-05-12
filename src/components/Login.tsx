import { Row, Col, Typography, Button, Space, Alert } from "antd";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import firebase from "firebase/app";
import { useTranslation } from "react-i18next";
import GlobalStats from "./GlobalStats";
import Link from "next/link";

const { Title, Paragraph } = Typography;

type TProps = {
  consent: boolean;
  acceptCookies: () => void;
};

const Login = ({ acceptCookies, consent }: TProps) => {
  const { t } = useTranslation();

  return (
    <Row justify="center" style={{ padding: 32 }}>
      <Col style={{ maxWidth: "600px" }}>
        <Typography>
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
            dankbaar zijn. Het ophalen of afleveren kan bvb met de fiets zo is
            er <b>geen distributie</b> nodig.
          </Paragraph>
          <Paragraph>
            Wij zorgen voor het contact, jullie doen de rest..
          </Paragraph>
          <GlobalStats />
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {consent ? (
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
          ) : (
            <Alert
              closable
              message="Gelieve cookies te aanvaarden om te kunnen inloggen"
              description={
                <Typography>
                  <Paragraph type="secondary">
                    Wij gebruiken cookies om je gebruikservaring te verbeteren.
                    Dit platform heeft geen enkel commercieel oogmerk. We
                    gebruiken dan ook enkel technische cookies en dus geen
                    cookies voor marketing doeleinden.
                  </Paragraph>
                  <Paragraph type="secondary">
                    Voor meer info verwijzen we naar onze{" "}
                    <Link href="/privacy">
                      <a>Privacy policy</a>
                    </Link>
                  </Paragraph>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button size="small" type="primary" onClick={acceptCookies}>
                      Ja, ik aanvaard cookies
                    </Button>
                  </div>
                </Typography>
              }
            ></Alert>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Login;
