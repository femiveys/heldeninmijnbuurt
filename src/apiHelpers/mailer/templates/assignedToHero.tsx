import { renderEmail } from "react-html-email";
import { TMailParams } from ".";
import { appName, fullAppUrl, formatLengthDistance } from "../../../helpers";
import { MailBody, MailHeroFooter, Link } from "../components";
import { masks } from "../helpers";

const assignedToHero = ({ requestor }: TMailParams) =>
  renderEmail(
    <MailBody>
      <p>Dag superheld,</p>
      <p>
        Er is iemand op <b>{formatLengthDistance(requestor.distance)}</b> die{" "}
        <b>{masks(requestor.needsMouthmaskAmount)}</b> zoekt.
      </p>
      <p> Laat hem of haar weten of je maskers hebt of kan maken.</p>
      <p>
        Zodra je aanvaard hebt, zullen jullie elkaars contactinformatie zien.
        Tot dan zien noch jij nog de aanvrager elkaars gegevens.
      </p>
      <p>
        <b>
          Laat ons ook weten als je niet kan ingaan op de aanvraag, dan kunnen
          wij een andere superheld zoeken voor je aanvrager.
        </b>
      </p>
      <br />
      <Link href={fullAppUrl}>
        Ga naar <b>{appName}</b> om de aanvraag te aanvaarden of af te wijzen
      </Link>
      <MailHeroFooter />
    </MailBody>
  );

export default assignedToHero;
