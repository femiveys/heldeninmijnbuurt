import { Button, Alert, Typography } from "antd";
import Link from "next/link";
import { GoogleOutlined, WarningOutlined } from "@ant-design/icons";
import firebase from "firebase/app";
import { useTranslation } from "react-i18next";

const { Paragraph } = Typography;

type TProps = {
  consent: boolean;
  acceptCookies: () => void;
};

const LoginButtons = ({ consent, acceptCookies }: TProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {true || consent ? (
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
                  gebruiken dan ook enkel technische cookies en dus geen cookies
                  voor marketing doeleinden.
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
      <div>
        <Typography>
          <Paragraph
            type="secondary"
            style={{ paddingTop: 16, fontSize: 12, textAlign: "center" }}
          >
            <WarningOutlined /> Login vanuit een <b>in app browser</b> (Facebook
            bvb) lukt voorlopig niet.
            <br />
            Open de site in een echte browser en het zal lukken.
            <br />
            We lossen dit probleem zo snel mogelijk op.
          </Paragraph>
        </Typography>
      </div>
    </div>
  );
};
export default LoginButtons;
