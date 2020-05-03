import { NextApiRequest, NextApiResponse } from "next";
import { createMaskRelation } from "../../apiHelpers/common";

// TO BE USED TO TEST THE DB FUNCTIONS
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const result = await createMaskRelation("aa", "bb", 44);
      console.log(result);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
