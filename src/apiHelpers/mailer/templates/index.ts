import { Dictionary } from "lodash";
import { SendMailOptions } from "nodemailer";

type TMailOptions = {
  subject: string;
  text: string;
  html?: string;
  attachments?: SendMailOptions["attachments"];
};

export const templates: Dictionary<TMailOptions> = {
  accepted: {
    subject: "Jouw superheld kan jou helpen",
    text:
      "Mail verstuurd naar aanvrager om te melden dan de superheld de aanvraag aanvaard heeft",
  },
  assignedToHero: {
    subject: "Er is een nieuwe aanvraag binnengekomen",
    text:
      "Mail verstuurd naar superheld om te melden dat er een nieuwe aanvraag is binnen gekomen",
  },
  assignedToRequestor: {
    subject: "We hebben een superheld voor je gevonden",
    text:
      "Mail verstuurd naar aanvrager om te melden dat er iemand gevonden is die maskers heeft",
  },
  declinedAndReassigned: {
    subject: "We hebben een nieuwe superheld voor je gevonden",
    text:
      "Mail verstuurd naar aanvrager om te melden dat de vorige superheld de aanvraag afgewezen heeft, maar dat we al een nieuwe superheld gevonden hebben",
  },
  declined: {
    subject: "Je superheld kan je jammergenoeg niet helpen",
    text:
      "Mail verstuurd naar aanvrager om te melden dat de vorige superheld de aanvraag afgewezen heeft, en dat we voorlopig geen nieuwe gevonden hebben",
  },
  heroMarkedAsHandedOver: {
    subject: "Je superheld heeft gemeld dat de maskers overhandigd zijn",
    text:
      "Mail verstuurd naar aanvrager om te melden dat de maskers overhandigd zijn",
  },
  requestorMarkedAsHandedOver: {
    subject: "Aanvrager heeft gemeld dat hij of zij de maskers ontvangen heeft",
    text:
      "Mail verstuurd naar superheld om te melden dat de aanvrager heeft gemeld dat hij of zij de maskers ontvangen heeft",
  },
  problemAndReassigned: {
    subject:
      "Wegens een probleem hebben we een nieuwe superheld gevonden voor je",
    text:
      "Mail verstuurd naar aanvrager om te melden dat de superheld een probleem gemeld heeft en dat we een nieuwe superheld gevonden hebben",
  },
  problem: {
    subject: "Je superheld heeft een probleem gemeld",
    text:
      "Mail verstuurd naar aanvrager om te melden dat de superheld een probleem gemeld heeft en dat we voorlopig geen nieuwe superheld gevonden hebben",
  },
  cancelled: {
    subject: "Je aanvrager heeft zijn of haar aanvraag geannuleerd",
    text:
      "Mail verstuurd naar superheld om te melden dat de aanvrager zijn of haar aanvraag geannuleerd heeft",
  },
  example: {
    subject: "En het werk ook met images ✔",
    text: "Korte body tekst",
    html: `
      <html>
        <body>
          <h1>Example image</h1>
          <img src="cid:example" />
        </body>
      </html>
    `,
    attachments: [
      {
        filename: "Example image.jpg",
        path: "apiHelpers/mailer/images/example.jpg",
        cid: "example", //same cid value as in the html img src
      },
    ],
  },
  test: {
    subject: "Test ✔",
    text: "Korte body tekst",
  },
};
