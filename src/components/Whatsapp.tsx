type TProps = {
  number: string;
  message: string;
};

const Whatsapp = ({ number, message }: TProps) => {
  const whatsapp = number && `32${number}`;
  const whatsappText = encodeURI(message);
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${whatsappText}`;

  return (
    <a href={whatsappUrl} target="_blank">
      +{whatsapp}
    </a>
  );
};

export default Whatsapp;
