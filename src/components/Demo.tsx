import { Typography, Col, Row, Carousel } from "antd";
import React from "react";
import { Trans } from "react-i18next";

const { Title } = Typography;

const screenshots = [
  {
    src: "/assets/enterAmount.png",
    comment: <Trans i18nKey="demo.enterAmount" />,
  },
  { src: "/assets/heroFound.png", comment: <Trans i18nKey="demo.heroFound" /> },
  {
    src: "/assets/contactHero.png",
    comment: <Trans i18nKey="demo.contactHero" />,
  },
  { src: "/assets/received.png", comment: <Trans i18nKey="demo.received" /> },
];

const Demo = () => (
  <div>
    <Title level={3}>
      <Trans i18nKey="demo.title" />
    </Title>
    <Title level={4}>
      <Trans i18nKey="demo.heros" />
    </Title>
    <Row className="screenshots">
      <Col xs={{ span: 24 }} sm={{ span: 12 }}>
        <img src="/assets/counters.png" />
        <img src="/assets/hero.png" />
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 12 }}>
        <ul>
          <li>
            <Trans i18nKey="demo.par1" components={[<b />, <b />]} />
          </li>
          <li>
            <Trans i18nKey="demo.par2" components={[<b />]} />
          </li>
          <li>
            <Trans i18nKey="demo.par3" components={[<b />, <b />]} />
          </li>
          <li>
            <Trans i18nKey="demo.par4" components={[<b />, <b />]} />
          </li>
          <li>
            <Trans i18nKey="demo.par5" components={[<b />]} />
          </li>
          <li>
            <Trans i18nKey="demo.par6" components={[<b />]} />
          </li>
        </ul>
      </Col>
    </Row>
    <br />
    <br />
    <Title level={4}>
      <Trans i18nKey="demo.requestors" />
    </Title>
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
