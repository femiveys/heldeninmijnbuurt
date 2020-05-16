import { renderEmail } from "react-html-email";
import { TMailParams } from ".";
import { appName, fullAppUrl } from "../../../helpers";
import { UserFrame, Link, MailRequestorFooter, MailBody } from "../components";
import { masks } from "../helpers";

const accepted = ({ hero, requestor }: TMailParams) =>
  renderEmail(
    <MailBody>
      <p>Hallo,</p>
      <p>
        Goed nieuws: Jouw superheld heeft jouw aanvraag aanvaard.
        <br />
        Vanaf nu kunnen jullie elkaar contacteren.
      </p>
      <p>Hieronder vind je de contactinformatie van je superheld:</p>
      <UserFrame
        user={hero}
        subject="Dag superheld"
        message={`Blijkbaar kan jij mij aan ${masks(
          requestor.needsMouthmaskAmount
        )} helpen.`}
      />
      <br />
      <Link href={fullAppUrl}>
        Ga naar <b>{appName}</b> om je aanvraag verder te bekijken
      </Link>
      <MailRequestorFooter num={requestor.needsMouthmaskAmount} />
    </MailBody>
  );

export default accepted;
