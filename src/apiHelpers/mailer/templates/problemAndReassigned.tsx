import { renderEmail } from "react-html-email";
import { TMailParams } from ".";
import { formatLengthDistance } from "../../../helpers";
import { MailBody, MailRequestorFooter, MailRequestorCTA } from "../components";

const problemAndReassigned = ({ hero, requestor }: TMailParams) =>
  renderEmail(
    <MailBody>
      <p>Hallo,</p>
      <p>
        We hadden een superheld voor je gevonden, maar die heeft een probleem
        gemeld en kon jammergenoeg niet meer helpen, maar geen nood, we hebben
        al een nieuwe superheld voor je gevonden op{" "}
        <b>{formatLengthDistance(hero.distance)}</b>.
      </p>
      <p>
        Nu zal je weer moeten afwachten en hopen dat hij of zij jouw superheld
        wordt. Zodra hij of zij een beslissing heeft genomen, nemen we weer
        contact met je op.
      </p>
      <br />
      <MailRequestorCTA />
      <MailRequestorFooter num={requestor.needsMouthmaskAmount} />
    </MailBody>
  );

export default problemAndReassigned;
