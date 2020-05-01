import { NextApiRequest, NextApiResponse } from "next";
import { setMaskStock } from "../../apiHelpers/superhero/setMaskStock";

// TO BE USED TO TEST THE DB FUNCTIONS
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const result = await setMaskStock("y4GulT5OOidcBu2mFAXQOkTPELG2", 30);
      console.log(result);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
