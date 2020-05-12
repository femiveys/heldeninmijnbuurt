import { Col, Row, Button, Typography, Result } from "antd";
import { useState } from "react";
import Link from "next/link";
import { grid } from "../helpers";

const { Paragraph } = Typography;

type TProps = {
  acceptCookies: () => void;
};

const Cookie = ({ acceptCookies }: TProps) => {
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <Row>
      <Col {...grid} style={{ padding: 32 }}>
        {showOverlay ? (
          <Result
            title="Wij gebruiken cookies"
            subTitle={
              <Typography>
                <Paragraph>
                  Wij gebruiken cookies om je gebruikservaring te verbeteren.
                  Dit platform kan niet werken zonder cookies.
                </Paragraph>
                <Paragraph>
                  Dit platform heeft geen enkel commercieel oogmerk. We
                  gebruiken dan ook enkel technische cookies en dus geen cookies
                  voor marketing doeleinden.
                  <br />
                  We gebruiken ook geen cookies om jou of je gedrag te volgen.
                </Paragraph>
                <Paragraph>
                  Voor meer info verwijzen we naar onze{" "}
                  <Link href="/privacy">
                    <a>Privacy policy</a>
                  </Link>
                </Paragraph>
              </Typography>
            }
            extra={[
              <Button
                key="nee"
                type="link"
                onClick={() => setShowOverlay(false)}
              >
                Nee, ik wil niet verder
              </Button>,
              <Button key="ja" type="primary" onClick={acceptCookies}>
                Ja, ik aanvaard cookies
              </Button>,
            ]}
          />
        ) : (
          <Result
            status="error"
            title="Spijtig, zonder cookies kunnen we niet verder"
            subTitle="Mocht je je toch nog bedenken, dan kan je altijd terugkomen of de pagina verversen"
          />
        )}
      </Col>
    </Row>
  );
};

export default Cookie;
