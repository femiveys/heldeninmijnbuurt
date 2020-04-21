import { NextApiRequest, NextApiResponse } from "next";
import { getAcceptedMakerRelationOf } from "../../apiHelpers/requestor/common";
import { setHandoverDone } from "../../apiHelpers/requestor/handover";
import { giveStarsToAcceptedMaker } from "../../apiHelpers/requestor/star";
import { getSuperHeroOf } from "../../apiHelpers/requestor/superHero";

// TO BE USED TO TEST THE DB FUNCTIONS
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const result = await getSuperHeroOf("saEzNHJmFDZXysV0urWO0H6Mwpp1");
      console.log(result);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
