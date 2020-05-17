import { NextApiRequest, NextApiResponse } from "next";
import { getNumMasksDelivered } from "../../apiHelpers/stats/local";
import { sendMail } from "../../apiHelpers/mailer";
import { EUserStatus } from "../../types";

// TO BE USED TO TEST THE DB FUNCTIONS
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const result = await sendMail(
        "femiveys@gmail.com,carolinerosu@hotmail.com",
        "accepted",
        {
          hero: {
            userId: "hero",
            name: "Femi Veys",
            email: "femiveys@gmail.com",
            streetId: 0,
            isMaker: true,
            isAdmin: false,
            maskStock: 50,
            numDelivered: 30,
            needsMouthmask: false,
            needsMouthmaskAmount: 0,
            stars: 0,
            numEvaluations: 0,
            whatsapp: "488014092",
            status: EUserStatus.active,
            isTester: true,
            distance: 1234,
            postalCode: 9876,
            streetDescNl: "",
            streetDescFr: "",
            streetDescDe: "",
            geolocation: { x: 0, y: 0 },
          },
          requestor: {
            userId: "requestor",
            name: "Requestor Veys",
            email: "requestorveys@gmail.com",
            streetId: 0,
            isMaker: false,
            isAdmin: false,
            maskStock: 0,
            numDelivered: 0,
            needsMouthmask: false,
            needsMouthmaskAmount: 20,
            stars: 0,
            numEvaluations: 0,
            whatsapp: "499567805",
            status: EUserStatus.active,
            isTester: true,
            distance: 1234,
            postalCode: 6789,
            streetDescNl: "",
            streetDescFr: "",
            streetDescDe: "",
            geolocation: { x: 0, y: 0 },
          },
        }
      );
      console.log(result);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
