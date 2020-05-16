import { Typography, Col, Row, Carousel } from "antd";
import React from "react";

const { Title } = Typography;

const screenshots = [
  { src: "/assets/enterAmount.png", comment: "Eenvoudig in gebruik" },
  { src: "/assets/heroFound.png", comment: "Respect voor je privacy" },
  {
    src: "/assets/contactHero.png",
    comment: "Makkelijk om in contact te komen met je superheld",
  },
  { src: "/assets/received.png", comment: "Eenvoudig proces" },
];

const Demo = () => (
  <div>
    <Title level={3}>Hoe werkt het?</Title>
    <Title level={4}>Dashboard voor superhelden</Title>
    <Row className="screenshots">
      <Col xs={{ span: 24 }} sm={{ span: 12 }}>
        <img src="/assets/counters.png" />
        <img src="/assets/hero.png" />
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 12 }}>
        <ul>
          <li>
            Het systeem houdt het <b>aantal mondmaskers</b> bij dat je al
            gemaakt hebt en je kan dit eenvoudig <b>delen</b>.
          </li>
          <li>
            Het aantal mondmaskers dat je <b>hebt of nog wil maken</b>, kan je
            op elk moment aanpassen.
          </li>
          <li>
            Een aanvraag uit de buurt wordt <b>automatisch</b> aan jou{" "}
            <b>toegewezen</b>.
          </li>
          <li>
            Je kan elke aanvraag <b>aanvaarden</b> of <b>afwijzen</b>.
          </li>
          <li>
            Voor de aanvragen die je aanvaard hebt, kan je makkelijk{" "}
            <b>contact</b> opnemen.
          </li>
          <li>
            Eens de maskers overhandigd zijn, kan je de aanvraag <b>afvinken</b>
            .
          </li>
        </ul>
      </Col>
    </Row>
    <br />
    <br />
    <Title level={4}>Voor zij die een mondmasker zoeken</Title>
    <Row>
      <Col xs={{ offset: 0, span: 24 }} sm={{ offset: 4, span: 16 }}>
        <Carousel
          autoplay
          dots={false}
          effect="fade"
          dotPosition="top"
          className="screenshots"
        >
          {screenshots.map((item) => (
            <div key={item.src}>
              <div className="comment">{item.comment}</div>
              <img src={item.src} />
            </div>
          ))}
        </Carousel>
      </Col>
    </Row>
  </div>
);

export default Demo;
