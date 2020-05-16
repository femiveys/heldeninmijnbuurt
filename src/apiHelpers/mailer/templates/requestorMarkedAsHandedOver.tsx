import { renderEmail } from "react-html-email";
import { TMailParams } from ".";
import { appName, fullAppUrl } from "../../../helpers";
import { Link, MailBody, MailHeroFooter } from "../components";
import { theMasks } from "../helpers";

const requestorMarkedAsHandedOver = ({ requestor }: TMailParams) =>
  renderEmail(
    <MailBody>
      <p>Dag superheld,</p>
      <p>
        <b>{requestor.name}</b>, voor wie je aangegeven hebt maskers te kunnen
        naaien heeft aangegeven dat hij of zij{" "}
        {theMasks(requestor.needsMouthmaskAmount)} ontvangen heeft.
      </p>
      <p>Vink dit ook af van je lijst aanvaarde aanvragen.</p>
      <br />
      <Link href={fullAppUrl}>
        Ga naar <b>{appName}</b> om ook van jouw kan aan te geven dat
        {requestor.needsMouthmaskAmount === 1
          ? " het masker overhandigd is"
          : " de maskers overhandigd zijn"}
        .
      </Link>
      <MailHeroFooter />
    </MailBody>
  );

export default requestorMarkedAsHandedOver;
