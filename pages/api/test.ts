import { NextApiRequest, NextApiResponse } from "next";
import { assignMakerTo } from "../../apiHelpers/requestor/assign";

// TO BE USED TO TEST THE DB FUNCTIONS
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const result = await assignMakerTo("saEzNHJmFDZXysV0urWO0H6Mwpp1");
      console.log(result);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
