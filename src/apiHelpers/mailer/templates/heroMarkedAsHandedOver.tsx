import { renderEmail } from "react-html-email";
import { TMailParams } from ".";
import { appName, fullAppUrl } from "../../../helpers";
import { theMasks } from "../helpers";
import { MailBody, Link, MailRequestorFooter } from "../components";

const heroMarkedAsHandedOver = ({ hero, requestor }: TMailParams) =>
  renderEmail(
    <MailBody>
      <p>Hallo,</p>
      <p>
        Je superheld ({hero.name}) heeft net aangegeven dat je{" "}
        {theMasks(requestor.needsMouthmaskAmount)} ontvangen hebt.
        <br />
        Klopt dit?
      </p>
      <br />
      <Link href={fullAppUrl}>
        Ga naar <b>{appName}</b> om ook van jouw kan aan te geven dat je{" "}
        {theMasks(requestor.needsMouthmaskAmount)} ontvangen hebt.
      </Link>
      <MailRequestorFooter num={requestor.needsMouthmaskAmount} />
    </MailBody>
  );

export default heroMarkedAsHandedOver;
