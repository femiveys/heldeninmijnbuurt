import { Typography } from "antd";
import AvailableForm from "./AvailableForm";

const { Title, Paragraph } = Typography;

type TProps = {
  fetchRequested: () => Promise<void>;
};

const EnterStock = ({ fetchRequested }: TProps) => {
  return (
    <div style={{ padding: 16 }}>
      <Typography>
        <Title level={4}>Jij wordt een superheld!</Title>
        <Paragraph>
          Jouw inzet wordt heel hard gewaardeerd. Je buurt is je dankbaar.
        </Paragraph>
        <Paragraph>
          Als superheld heb je natuurlijk totale controle over het aantal
          mondmaskers dat je maakt.
          <br />
          Je krijgt eerst een aanvraag die je kan aanvaarden of afwijzen. Het is
          pas eens je een aanvraag aanvaardt dat je de contact gegevens van de
          aanvrager zal zien.
          <br />
          Ook de aanvrager zal pas je contactgegevens zien eens jij de aanvraag
          aanvaard hebt. Indien je de aanvraag niet aanvaardt zal die aan een
          andere superheld in de buurt toegewezen worden.
        </Paragraph>
        <Paragraph>
          Hieronder kan je aangeven hoeveel mondmaskers je hebt of wilt maken.
          Wij noemen dit je "stock".
        </Paragraph>
        <Paragraph>
          Wij vragen om je "stock" op te geven zodat je op je eigen tempo kan
          naaien en dat er geen aanvragen aan jou toegewezen worden die je niet
          kan vervullen.
        </Paragraph>
        <Paragraph>
          Telkens je aangeeft dat mondmaskers afgeleverd zijn, wordt je stock
          automatisch aangepast. Echter, je kan je stock op elk moment zelf
          aanpassen.
        </Paragraph>
      </Typography>
      <AvailableForm fetchRequested={fetchRequested} />
    </div>
  );
};

export default EnterStock;
