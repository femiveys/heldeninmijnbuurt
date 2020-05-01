import { NextApiRequest, NextApiResponse } from "next";
import { assignNearestUnassignedRequestors } from "../../apiHelpers/superhero/setMaskStock";

// TO BE USED TO TEST THE DB FUNCTIONS
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const result = await assignNearestUnassignedRequestors(
        "y4GulT5OOidcBu2mFAXQOkTPELG2"
      );
      console.log(result);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
