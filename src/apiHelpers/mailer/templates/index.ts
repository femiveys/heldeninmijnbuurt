import { Dictionary } from "lodash";
import { SendMailOptions } from "nodemailer";
import accepted from "./accepted";
import assignedToHero from "./assignedToHero";
import assignedToRequestor from "./assignedToRequestor";
import declinedAndReassigned from "./declinedAndReassigned";
import declined from "./declined";
import heroMarkedAsHandedOver from "./heroMarkedAsHandedOver";
import requestorMarkedAsHandedOver from "./requestorMarkedAsHandedOver";
import problemAndReassigned from "./problemAndReassigned";
import { TUserAndDistance } from "../../../types";
import problem from "./problem";
import cancelled from "./cancelled";

export type TMailParams = {
  hero: TUserAndDistance;
  requestor: TUserAndDistance;
};

type TMailOptions = {
  subject: string;
  text: string;
  html?: (params: TMailParams) => string;
  attachments?: SendMailOptions["attachments"];
};

export const templates: Dictionary<TMailOptions> = {
  accepted: {
    subject: "Jouw superheld kan jou helpen",
    text: `Vanaf nu kunnen jullie elkaar contacteren.
      Hieronder vind je de contactinformatie van je superheld.`,
    html: accepted,
  },
  assignedToHero: {
    subject: "Er is een nieuwe aanvraag binnengekomen",
    text: "Laat snel weten of je de gevraagde maskers hebt of kan maken.",
    html: assignedToHero,
  },
  assignedToRequestor: {
    subject: "We hebben een superheld voor je gevonden",
    text:
      "Zodra hij of zij je aanvraag aanvaardt, kunnen jullie onderling regelen hoe je de overhandiging zal laten gebeuren.",
    html: assignedToRequestor,
  },
  declinedAndReassigned: {
    subject: "We hebben een nieuwe superheld voor je gevonden",
    text:
      "De superheld die we voor je gevonden hadden, kon je jammergenoeg niet helpen. Maar geen nood, we hebben al een nieuwe superheld voor je gevonden.",
    html: declinedAndReassigned,
  },
  declined: {
    subject: "Je superheld kan je jammergenoeg niet helpen",
    text:
      "Voorlopig hebben we ook geen nieuwe superheld gevonden. Zodra we iemand in je buurt vinden die je kan helpen, laten we het je weten",
    html: declined,
  },
  heroMarkedAsHandedOver: {
    subject: "Je superheld heeft gemeld dat de maskers overhandigd zijn",
    text: "Klopt dit? Geef ook aan dat je de maskers ontvangen hebt.",
    html: heroMarkedAsHandedOver,
  },
  requestorMarkedAsHandedOver: {
    subject: "Aanvrager heeft gemeld dat hij of zij de maskers ontvangen heeft",
    text: "Laat ons ook weten dat de maskers overhandigd geweest zijn.",
    html: requestorMarkedAsHandedOver,
  },
  problemAndReassigned: {
    subject:
      "Wegens een probleem hebben we een nieuwe superheld voor je gevonden ",
    text: "Nu nog even geduld hebben tot hij of zij je aanvraag aanvaardt.",
    html: problemAndReassigned,
  },
  problem: {
    subject: "Je superheld heeft een probleem gemeld",
    text:
      "Voorlopig hebben we ook geen nieuwe superheld gevonden. Zodra we iemand in je buurt vinden die je kan helpen, laten we het je weten",
    html: problem,
  },
  cancelled: {
    subject: "Je aanvrager heeft zijn of haar aanvraag geannuleerd",
    text:
      "We hebben de aanvraag al van je lijst gehaald. Je kan de mondmaskers nu voor iemand anders voorzien",
    html: cancelled,
  },
  message: {
    subject: "Bedankt, superheld",
    text: "",
  },
  example: {
    subject: "En het werk ook met images ✔",
    text: "Korte body tekst",
    html: () => `
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
