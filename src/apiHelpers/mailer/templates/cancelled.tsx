import { Email, Item, Span, renderEmail } from "react-html-email";
import { appName, fullAppUrl } from "../../../helpers";
import { body, MailLink } from "./theme";
import { TMailParams } from ".";

const cancelled = ({ requestor }: TMailParams) => {
  const masks =
    requestor.needsMouthmaskAmount === 1
      ? "een mondmasker"
      : `${requestor.needsMouthmaskAmount} mondmaskers`;

  return renderEmail(
    <Email title={`Mail van ${appName}`} {...body}>
      <Item style={{ fontSize: 16 }}>
        <Span>
          Hallo,
          <br />
          <br />
          {requestor.name}, een van de personen voor wie je {masks} zou
          voorzien, heeft zijn of haar aanvraag geannuleerd.
          <br />
          <br />
          Dit wil zeggen dat je nu voor iemand anders {masks} kan voorzien. We
          hebben alvast je "stock" aangepast.
          <br />
          <br />
          Zodra een nieuwe aanvraag binnenkomt, laten we het je weten.
        </Span>
      </Item>
      <br />
      <Item>
        <Span fontSize={16} align="center">
          <MailLink href={fullAppUrl}>
            Ga naar <b>{appName}</b> om te kijken of je nieuwe aanvragen hebt.
          </MailLink>
        </Span>
      </Item>
    </Email>
  ) as string;
};

export default cancelled;
