import { Typography } from "antd";

const { Title } = Typography;

const GeneralConditions = () => {
  return (
    <Typography className="legal-document">
      <Title>Algemene voorwaarden</Title>
      <ol>
        <li>
          Helden in mijn buurt verder HIMB genoemd, heeft enkel tot doel mensen
          die maskers zoeken in contact te brengen met mensen die maskers naaien
          en aanbieden.
        </li>
        <li>
          HIMB heeft geen enkel commercieel oogmerk: er wordt geen geld
          aangeboden, er wordt geen geld gevraagd.
        </li>
        <li>
          HIMB kan niet verantwoordelijk gesteld worden voor:
          <ol>
            <li>
              wat er gebeurt tijdens de contacten die aanbieders en gebruikers
              hebben
            </li>
            <li>de kwaliteit van de maskers </li>
            <li>de duur van het maken of afleveren van de maskers.</li>
            <li>
              eventuele ongelukken die gebeuren voor na of tijdens het maken,
              afleveren of ophalen van de maskers
            </li>
            <li>
              het naleven van de hygiënische maatregelen die gevraagd worden
              tijdens de transactie
            </li>
            <li>het niet ontvangen of niet afleveren van maskers </li>
            <li>
              geschillen die zouden ontstaan tussen aanbieders onderling,
              aanvragers onderling of aanbieders en aanvragers
            </li>
            <li>aanbieders die geld vragen voor hun diensten of materiaal</li>
          </ol>
        </li>
        <li>
          HIMB geeft geen garantie dat mensen effectief een masker kunnen vinden
          via het platform.
        </li>
        <li>
          HIMB behoudt zich het recht elk moment te stoppen met het aanbieden
          van het platform.
        </li>
        <li>HIMB kan elk moment en voor onbepaalde duur offline gaan.</li>
      </ol>
    </Typography>
  );
};

export default GeneralConditions;
