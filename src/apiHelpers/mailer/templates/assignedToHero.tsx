import { Email, Item, Span, renderEmail } from "react-html-email";
import { TMailParams } from ".";
import { appName, fullAppUrl, formatLengthDistance } from "../../../helpers";
import { body, MailLink } from "./theme";

const assignedToHero = ({ requestor }: TMailParams) =>
  renderEmail(
    <Email title={`Mail van ${appName}`} {...body}>
      <Item style={{ fontSize: 16 }}>
        <Span>
          Dag superheld,
          <br />
          <br />
          Er is iemand op <b>{formatLengthDistance(requestor.distance)}</b> die
          <b> {requestor.needsMouthmaskAmount}</b> mondmasker
          {requestor.needsMouthmaskAmount > 1 ? "s " : " "}
          zoekt.
          <br />
          <br />
          Laat hem of haar weten of je maskers hebt of kan maken.
          <br />
          <br />
          Zodra je aanvaard hebt, zullen jullie elkaars contactinformatie zien.
          Tot dan zien noch jij nog de aanvrager elkaars gegevens.
          <br />
          <br />
          <b>
            Laat ons ook weten als je niet kan ingaan op de aanvraag, dan kunnen
            wij een andere superheld zoeken voor je aanvrager.
          </b>
        </Span>
      </Item>
      <br />
      <br />
      <Item>
        <Span fontSize={16} align="center">
          <MailLink href={fullAppUrl}>
            Ga naar <b>{appName}</b> om de aanvraag te aanvaarden of af te
            wijzen
          </MailLink>
        </Span>
      </Item>
    </Email>
  ) as string;

export default assignedToHero;
