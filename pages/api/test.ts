import { NextApiRequest, NextApiResponse } from "next";
import { getAcceptedMakerRelationOf } from "../../apiHelpers/requestor/common";
import { setHandoverDone } from "../../apiHelpers/requestor/handover";
import { giveStarsToAcceptedMaker } from "../../apiHelpers/requestor/star";
import { getSuperHeroOf } from "../../apiHelpers/requestor/superHero";
import { sendMail } from "../../apiHelpers/mailer";

// TO BE USED TO TEST THE DB FUNCTIONS
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const result = await sendMail("femiveys@gmail.com", "example");
      console.log(result);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
