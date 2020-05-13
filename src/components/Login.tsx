import { Row, Col, Typography } from "antd";
import GlobalStats from "./GlobalStats";
import { grid } from "../helpers";
import Demo from "./Demo";
import LoginButtons from "./LoginButtons";

const { Title, Paragraph } = Typography;

type TProps = {
  consent: boolean;
  acceptCookies: () => void;
};

const Login = (props: TProps) => (
  <Row>
    <Col {...grid} style={{ padding: 32 }}>
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
          dankbaar zijn. Het ophalen of afleveren kan bvb met de fiets zo is er{" "}
          <b>geen distributie</b> nodig.
        </Paragraph>
        <Paragraph>
          Wij zorgen voor het contact, jullie doen de rest..
        </Paragraph>
      </Typography>

      <GlobalStats />

      <LoginButtons {...props} />
      <br />
      <br />
      <Demo />
      <br />
      <br />
      <LoginButtons {...props} />
    </Col>
  </Row>
);

export default Login;
