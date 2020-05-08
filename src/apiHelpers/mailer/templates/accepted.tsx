import { Email, Item, Span, renderEmail } from "react-html-email";
import { TMailParams } from ".";
import { appName, fullAppUrl, formatLengthDistance } from "../../../helpers";
import { body, Whatsapp, MailLink } from "./theme";

const accepted = ({ hero }: TMailParams) =>
  renderEmail(
    <Email title={`Mail van ${appName}`} {...body}>
      <Item style={{ fontSize: 16 }}>
        <Span>
          Hallo,
          <br />
          <br />
          Goed nieuws: Jouw superheld heeft jouw aanvraag aanvaard.
          <br />
          Vanaf nu kunnen jullie elkaar contacteren.
          <br />
          Hieronder vind je de contactinformatie van je superheld.
          <br />
          <br />
          <Item
            style={{
              border: "1px solid #91d5ff",
              padding: "8px 15px",
              backgroundColor: "#e6f7ff",
              fontWeight: "bold",
            }}
          >
            <Span>{hero.name}</Span>
            <br />
            <br />
            <Span>Woont op {formatLengthDistance(hero.distance)}</Span>
            <br />
            <br />
            <Span>
              <MailLink href={`mailto:${fullAppUrl}`}>{hero.email}</MailLink>
            </Span>
            {hero.whatsapp && (
              <>
                <br />
                <br />
                <Whatsapp number={hero.whatsapp} message="Dag superheld" />
              </>
            )}
          </Item>
        </Span>
      </Item>
      <br />
      <Item>
        <Span fontSize={16} align="center">
          <MailLink href={fullAppUrl}>
            Ga naar <b>{appName}</b> om je aanvraag verder te bekijken
          </MailLink>
        </Span>
      </Item>
    </Email>
  ) as string;

export default accepted;
