import { renderEmail } from "react-html-email";
import { appName, fullAppUrl } from "../../../helpers";
import { TMailParams } from ".";
import { MailBody, Link, MailHeroFooter } from "../components";
import { masks } from "../helpers";

const cancelled = ({ requestor }: TMailParams) =>
  renderEmail(
    <MailBody>
      <p>Dag superheld,</p>
      <p>
        <b>{requestor.name}</b>, een van de personen voor wie je{" "}
        {masks(requestor.needsMouthmaskAmount)} zou voorzien, heeft zijn of haar
        aanvraag geannuleerd.
      </p>
      <p>
        Dit wil zeggen dat je nu voor iemand anders {masks} kan voorzien. We
        hebben alvast je "stock" aangepast.
      </p>
      <p>Zodra een nieuwe aanvraag binnenkomt, laten we het jou weten.</p>
      <br />
      <Link href={fullAppUrl}>
        Ga naar <b>{appName}</b> om te kijken of je nieuwe aanvragen hebt.
      </Link>
      <MailHeroFooter />
    </MailBody>
  );

export default cancelled;
