import { Email, Item, Span, renderEmail } from "react-html-email";
import { appName, fullAppUrl } from "../../../helpers";
import { body, MailLink } from "./theme";

const problem = () =>
  renderEmail(
    <Email title={`Mail van ${appName}`} {...body}>
      <Item style={{ fontSize: 16 }}>
        <Span>
          Hallo,
          <br />
          <br />
          We hadden een superheld voor je gevonden, maar die heeft een probleem
          gemeld en kon jammergenoeg niet meer helpen.
          <br />
          <br />
          Voorlopig hebben we ook geen nieuwe superheld gevonden. Zodra we
          iemand in je buurt vinden die je kan helpen, laten we het je weten.
        </Span>
      </Item>
      <br />
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

export default problem;
