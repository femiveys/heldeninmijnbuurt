import { TUserAndDistance } from "../../types";
import { formatLengthDistance, fullAppUrl, appName } from "../../helpers";
import { masks, blue, black, white } from "./helpers";

export const MailBody: React.FunctionComponent = ({ children }) => (
  <div style={{ fontSize: 14, color: black }}>{children}</div>
);

type TLinkProps = {
  href: string;
};
export const Link: React.FunctionComponent<TLinkProps> = ({
  href,
  children,
}) => (
  <a
    href={href}
    style={{ color: blue, textDecoration: "none" }}
    target="_blank"
  >
    {children}
  </a>
);

type TWhatsappProps = {
  number: string;
  message: string;
};
export const Whatsapp = ({ number, message }: TWhatsappProps) => {
  const whatsapp = number && `32${number}`;
  const whatsappText = encodeURI(message);
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${whatsappText}`;
  return (
    <span>
      <Link href={whatsappUrl}>+{whatsapp}</Link>{" "}
      <span style={{ fontSize: 10 }}>(klik om te openen in Whatsapp)</span>
    </span>
  );
};

type TMailLinkProps = {
  to: string;
  subject: string;
  message: string;
};
export const MailLink = ({ to, subject, message }: TMailLinkProps) => (
  <Link
    href={`mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`}
  >
    {to}
  </Link>
);

type TUserFrameProps = {
  user: TUserAndDistance;
  subject: string;
  message: string;
};
export const UserFrame = ({ user, subject, message }: TUserFrameProps) => (
  <div
    style={{
      border: "1px solid #91d5ff",
      padding: "0 15px",
      backgroundColor: "#e6f7ff",
    }}
  >
    <p>
      <b>{user.name}</b>
    </p>
    <p>Woont op {formatLengthDistance(user.distance)}</p>
    <p>
      <MailLink to={user.email} subject={subject} message={message} />
    </p>
    {user.whatsapp && (
      <p>
        <Whatsapp number={user.whatsapp} message={`${subject}. ${message}`} />
      </p>
    )}
  </div>
);

const style = { fontSize: 11, marginTop: 16, fontColor: "grey" };

type TMailRequestorFooterProps = {
  num: number;
};
export const MailRequestorFooter = ({ num }: TMailRequestorFooterProps) => (
  <div style={style}>
    —<br />
    Je ontvangt deze mail omdat je {masks(num)} hebt aangevraagd.
    <br />
    Als je geen mails meer wilt ontvangen, annuleer je best je aanvraag op{" "}
    <Link href={fullAppUrl}>{appName}</Link>.
  </div>
);

export const MailHeroFooter = () => (
  <div style={style}>
    —<br />
    Je ontvangt deze mail omdat je je opgegeven hebt om mondmaskers te maken.
    <br />
    Als je geen mails meer wilt ontvangen, geef je best aan dat je geen
    mondmaskers meer wilt maken op <Link href={fullAppUrl}>{appName}</Link>.
  </div>
);
export const MailRequestorCTA = () => (
  <Link href={fullAppUrl}>
    Ga naar <b>{appName}</b> om het verdere verloop van ja aanvraag te bekijken
  </Link>
);
