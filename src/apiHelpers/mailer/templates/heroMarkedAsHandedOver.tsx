import { Email, Item, Span, renderEmail } from "react-html-email";
import { TMailParams } from ".";
import { appName, fullAppUrl } from "../../../helpers";
import { body, MailLink } from "./theme";

const heroMarkedAsHandedOver = ({ hero }: TMailParams) =>
  renderEmail(
    <Email title={`Mail van ${appName}`} {...body}>
      <Item style={{ fontSize: 16 }}>
        <Span>
          Hallo,
          <br />
          <br />
          Je superheld ({hero.name}) heeft net aangegeven dat je de maskers
          ontvangen hebt.
          <br />
          Klopt dit?
        </Span>
      </Item>
      <br />
      <Item>
        <Span fontSize={16} align="center">
          <MailLink href={fullAppUrl}>
            Ga naar <b>{appName}</b> om ook van jouw kan aan te geven dat je de
            maskers ontvangen hebt.
          </MailLink>
        </Span>
      </Item>
    </Email>
  ) as string;

export default heroMarkedAsHandedOver;
