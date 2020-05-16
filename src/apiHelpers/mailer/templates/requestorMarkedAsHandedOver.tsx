import { Email, Item, Span, renderEmail } from "react-html-email";
import { TMailParams } from ".";
import { appName, fullAppUrl } from "../../../helpers";
import { body, MailLink } from "./theme";

const requestorMarkedAsHandedOver = ({ requestor }: TMailParams) =>
  renderEmail(
    <Email title={`Mail van ${appName}`} {...body}>
      <Item style={{ fontSize: 16 }}>
        <Span>
          Hallo,
          <br />
          <br />
          {requestor.name}, voor wie je aangegeven hebt maskers te kunnen naaien
          heeft aangegeven dat hij of zij
          {requestor.needsMouthmaskAmount === 1
            ? " het gevraagde masker "
            : ` de ${requestor.needsMouthmaskAmount} gevraagde maskers `}
          ontvangen heeft.
          <br />
          <br />
          Vink dit ook af van je lijst aanvaarde aanvragen.
        </Span>
      </Item>
      <br />
      <Item>
        <Span fontSize={16} align="center">
          <MailLink href={fullAppUrl}>
            Ga naar <b>{appName}</b> om ook van jouw kan aan te geven dat
            {requestor.needsMouthmaskAmount === 1
              ? " het masker overhandigd is"
              : " de maskers overhandigd zijn"}
            .
          </MailLink>
        </Span>
      </Item>
    </Email>
  ) as string;

export default requestorMarkedAsHandedOver;
