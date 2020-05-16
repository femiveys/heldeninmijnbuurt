import { renderEmail } from "react-html-email";
import { MailBody, MailRequestorFooter, MailRequestorCTA } from "../components";
import { TMailParams } from ".";

const problem = ({ requestor }: TMailParams) =>
  renderEmail(
    <MailBody>
      <p>Hallo,</p>
      <p>
        We hadden een superheld voor je gevonden, maar die heeft een probleem
        gemeld en kon jammergenoeg niet meer helpen.
      </p>
      <p>
        Voorlopig hebben we ook geen nieuwe superheld gevonden. Zodra we iemand
        in je buurt vinden die je kan helpen, laten we het jou weten.
      </p>
      <br />
      <MailRequestorCTA />
      <MailRequestorFooter num={requestor.needsMouthmaskAmount} />
    </MailBody>
  );

export default problem;
