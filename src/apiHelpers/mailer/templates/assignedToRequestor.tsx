import { renderEmail } from "react-html-email";
import { TMailParams } from ".";
import { formatLengthDistance } from "../../../helpers";
import { MailBody, MailRequestorFooter, MailRequestorCTA } from "../components";

const assignedToRequestor = ({ hero, requestor }: TMailParams) =>
  renderEmail(
    <MailBody>
      <p>Hallo,</p>
      <p>
        We hebben op <b>{formatLengthDistance(hero.distance)}</b> iemand
        gevonden die maskers heeft. We wachten nu tot hij of zij je aanvraag
        aanvaardt.
      </p>
      <p>
        Enkel het aantal maskers en de afstand is doorgegeven, dus geen
        persoonlijke informatie.
      </p>
      <p>
        Zodra je aanvraag aanvaard is, krijg je opnieuw een mail en zal je de
        contact informatie vinden, zodat jullie het onderling kunnen regelen.
      </p>
      <br />
      <MailRequestorCTA />
      <MailRequestorFooter num={requestor.needsMouthmaskAmount} />
    </MailBody>
  );

export default assignedToRequestor;
