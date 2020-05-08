import { A } from "react-html-email";

export const blue = "#1890ff";

export const body = {
  fontSize: 16,
  color: "#000000a6",
  backgroundColor: "#f0f2f5",
};

type TProps = {
  number: string;
  message: string;
};

export const Whatsapp = ({ number, message }: TProps) => {
  const whatsapp = number && `32${number}`;
  const whatsappText = encodeURI(message);
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${whatsappText}`;

  return (
    <A style={{ color: blue, textDecoration: "none" }} href={whatsappUrl}>
      +{whatsapp}
    </A>
  );
};

export const MailLink: React.FunctionComponent<{ href: string }> = ({
  href,
  children,
}) => (
  <A href={href} style={{ color: blue, textDecoration: "none" }}>
    {children}
  </A>
);
