import { useTranslation } from "react-i18next";
import { Button, Alert, Typography } from "antd";
import Link from "next/link";
import {
  GoogleOutlined,
  WarningOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import firebase from "firebase/app";
import { useState } from "react";

const { Paragraph } = Typography;

const centered = { padding: 8, display: "flex", justifyContent: "center" };

type TProps = {
  consent: boolean;
  acceptCookies: () => void;
};

const LoginButtons = ({ consent, acceptCookies }: TProps) => {
  const { t } = useTranslation();
  const [error, setError] = useState<{ email: string }>();

  return (
    <div>
      <div>
        {true || consent ? (
          <>
            <div style={centered}>
              <Button
                size="large"
                icon={<GoogleOutlined />}
                style={{ backgroundColor: "#de5246", color: "white" }}
                onClick={() => {
                  const provider = new firebase.auth.GoogleAuthProvider();
                  // firebase.auth().signInWithPopup(provider);
                  firebase.auth().signInWithRedirect(provider);
                }}
              >
                {t("login.google")}
              </Button>
            </div>
            <div style={centered}>
              <Button
                size="large"
                icon={<FacebookOutlined />}
                style={{ backgroundColor: "#3b5998", color: "white" }}
                onClick={async () => {
                  try {
                    const provider = new firebase.auth.FacebookAuthProvider();
                    await firebase.auth().signInWithPopup(provider);
                  } catch (error) {
                    console.log("error", error);
                    if (
                      error.code ===
                      "auth/account-exists-with-different-credential"
                    ) {
                      setError(error);
                    }
                  }
                }}
              >
                {t("login.facebook")}
              </Button>
            </div>
          </>
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
      {error && (
        <Paragraph type="danger" style={{ fontSize: 12 }}>
          Hetzelfde E-mail adres (<b>{error.email}</b>) waarmee je met Facebook
          wilde inloggen, is al aan je Google account verbonden.
          <br />
          <b>Log in met je Google account.</b>
        </Paragraph>
      )}
      <Paragraph type="secondary" style={{ paddingTop: 16, fontSize: 12 }}>
        <WarningOutlined /> Als je problemen hebt met inloggen vanuit een{" "}
        <b>in app browser</b> (Facebook bvb), probeer dan de site in een echte
        browser te openen.
      </Paragraph>
    </div>
  );
};
export default LoginButtons;
