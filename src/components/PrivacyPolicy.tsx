import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const PrivacyPolicy = () => {
  return (
    <Typography>
      <Title>Privacy Policy</Title>
      <Paragraph>
        Wij proberen zoveel mogelijk je privacy te garanderen, zo vragen we je
        nooit naar je exacte huisnummer.
      </Paragraph>
      <Title level={4}>Welke persoonlijke data wordt opgeslagen?</Title>
      <Paragraph>
        Wij slaan enkel de strikt noodzakelijke gegevens op om met elkaar in
        contact te kunnen komen:
        <ul>
          <li>Naam</li>
          <li>E-mailadres</li>
          <li>WhatsApp nummer</li>
          <li>Straat</li>
        </ul>
      </Paragraph>
      <Title level={4}>Hoe wordt de data opgeslagen?</Title>
      <Paragraph>
        Alle gegevens van de applicatie worden opgeslagen in een databank in
        Europa die met een sterk paswoord beveiligd is. Er worden geen
        paswoorden opgeslagen. Het inloggen gebeurt via derden (OAuth
        providers).
      </Paragraph>
      <Title level={4}>Wie kan je gegevens zien?</Title>
      <Paragraph>
        De applicatie zelf communiceert enkel met de databank via een API die
        ervoor zorgt dat gebruikers enkel aan hun eigen data kunnen of de data
        van de personen waarmee ze rechtstreeks in contact zijn.
        <br />
        Het systeem zal nooit de exacte straat van een ander persoon tonen.
        <br />
        Zolang de aanbieder van maskers een aanvraag niet aanvaard heeft, kunnen
        noch hij/zij noch de aanvrager elkaars gegevens zien. Op dat moment is
        enkel het aantal gevraagde maskers en de afstand tot elkaars straten
        zichtbaar.
        <br />
        Eens de aanvraag van de maskers aanvaard is door een aanbieder, kunnen
        zowel aanbieder als aanvrager elkaars contactgegevens zijn. Deze zijn:
        naam, e-mailadres en whatsapp nummer.
      </Paragraph>
      <Title level={4}>
        Commerciële doeleinden en doorverkopen van gegevens
      </Title>
      <Paragraph>
        Dit is een volledig vrijwilligersproject en heeft en zal nooit een
        commercieel doel hebben. De data die we opslaan zal nooit verkocht
        worden. De data zal nooit in handen van derden komen.
      </Paragraph>
      <Paragraph>
        Je kan enkel contactgegevens zien van de persoon waarmee je in contact
        bent.
      </Paragraph>
      <Title level={4}>Data retentie</Title>
      <Paragraph>
        Om te vermijden dat mensen meer maskers aanvragen dan sociaal
        aanvaardbaar is, zorgt het systeem ervoor dat mensen maar 1 keer een
        aanvraag kunnen doen. Om dit mogelijk te maken onthoudt het systeem de
        gegevens zo lang als de corona crisis blijft duren.
      </Paragraph>
      <Title level={4}>Cookies</Title>
      <Paragraph>
        Cookies zijn kleine tekstbestanden die lokaal worden opgeslagen op uw
        computer. Deze cookies dienen voor tal van doeleinden: het onthouden van
        instellingen (login, taalkeuzes), het vergaren van informatie en het
        bijhouden van het bezoekgedrag van de gebruikers. De cookies die wij
        gebruiken zijn veilig: zij hebben geen toegang tot persoonlijke
        informatie op uw computer en kunnen deze niet beschadigen of besmetten
        met virussen. De cookies geven op geen enkele manier persoonlijke
        informatie aan ons door. De informatie die we via cookies verzamelen
        helpt ons om eventuele fouten te identificeren of om u van specifieke
        diensten te laten genieten.
      </Paragraph>
      <Paragraph>
        Via uw browser kunt u te allen tijde instellen of u cookies
        geïnstalleerd wilt hebben. Deze procedures kunnen door de ontwikkelaars
        van de browsers herzien of gewijzigd worden; bijgevolg kunnen wij niet
        garanderen dat ze steeds volledig conform de meest recente versie zijn.
      </Paragraph>
      <Title level={4}>Contact</Title>
      <Paragraph>
        Indien u vragen of suggesties hebt over gegevensbescherming of de
        verwerking van persoonsgegevens, gelieve dan contact met ons op te
        nemen. Wij behandelen graag alle vragen om informatie of andere
        eventuele verzoeken en klachten:
        <br />
        IT Simply Works
        <br />
        Femi Veys
        <br />
        Limnanderstraat 20
        <br />
        1070 Anderlecht
        <br />
        contact@heldeninmijnbuurt.be
      </Paragraph>
    </Typography>
  );
};

export default PrivacyPolicy;
