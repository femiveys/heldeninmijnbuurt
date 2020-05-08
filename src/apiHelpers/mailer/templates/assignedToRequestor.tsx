import { Email, Item, Span, renderEmail } from "react-html-email";
import { TMailParams } from ".";
import { appName, fullAppUrl, formatLengthDistance } from "../../../helpers";
import { body, MailLink } from "./theme";

const assignedToRequestor = ({ hero }: TMailParams) =>
  renderEmail(
    <Email title={`Mail van ${appName}`} {...body}>
      <Item style={{ fontSize: 16 }}>
        <Span>
          Hallo,
          <br />
          <br />
          We hebben op <b>{formatLengthDistance(hero.distance)}</b> iemand
          gevonden die maskers heeft. We wachten nu tot hij of zij je aanvraag
          aanvaardt.
          <br />
          <br />
          Enkel het aantal maskers en de afstand is doorgegeven, dus geen
          persoonlijke informatie.
          <br />
          <br />
          Zodra je aanvraag aanvaard is, krijg je opnieuw een mail en zal je de
          contact informatie vinden, zodat jullie het onderling kunnen regelen.
        </Span>
      </Item>
      <br />
      <Item>
        <Span fontSize={16} align="center">
          <MailLink href={fullAppUrl}>
            Ga naar <b>{appName}</b> om het verdere verloop van ja aanvraag te
            bekijken
          </MailLink>
        </Span>
      </Item>
    </Email>
  ) as string;

export default assignedToRequestor;
