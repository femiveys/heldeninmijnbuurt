import { Email, Item, Span, renderEmail } from "react-html-email";
import { TMailParams } from ".";
import { appName, fullAppUrl, formatLengthDistance } from "../../../helpers";
import { body, MailLink } from "./theme";

const declinedAndReassigned = ({ hero }: TMailParams) =>
  renderEmail(
    <Email title={`Mail van ${appName}`} {...body}>
      <Item style={{ fontSize: 16 }}>
        <Span>
          Hallo,
          <br />
          <br />
          We hadden een superheld voor je gevonden, maar die kon jammergenoeg
          niet helpen, maar geen nood, we hebben al een nieuwe superheld voor je
          gevonden op <b>{formatLengthDistance(hero.distance)}</b>.
          <br />
          <br />
          Nu zal je weer moeten afwachten en hopen dat hij of zij jouw superheld
          wordt. Zodra hij of zij een beslissing heeft genomen, nemen we weer
          contact met je op.
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

export default declinedAndReassigned;
