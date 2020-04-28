import { Dictionary } from "lodash";
import { SendMailOptions } from "nodemailer";

type TMailOptions = {
  subject: string;
  text: string;
  html?: string;
  attachments?: SendMailOptions["attachments"];
};

export const templates: Dictionary<TMailOptions> = {
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
  accepted: {
    subject: "Todo ✔",
    text: "Todo",
  },
  assignedToHero: {
    subject: "Todo ✔",
    text: "Todo",
  },
  assignedToRequestor: {
    subject: "Todo ✔",
    text: "Todo",
  },
  declinedAndReassigned: {
    subject: "Todo ✔",
    text: "Todo",
  },
  heroMarkedAsHandedOver: {
    subject: "Todo ✔",
    text: "Todo",
  },
  requestorMarkedAsHandedOver: {
    subject: "Todo ✔",
    text: "Todo",
  },
  cancelled: {
    subject: "Todo ✔",
    text: "Todo",
  },
};
