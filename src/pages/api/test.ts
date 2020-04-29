import { NextApiRequest, NextApiResponse } from "next";
import { setNeedsMouthmask } from "../../apiHelpers/me/setNeedsMouthmask";

// TO BE USED TO TEST THE DB FUNCTIONS
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const result = await setNeedsMouthmask("x9RCqQ4wFlVa8yH70OW3VT8W68v2");
      console.log(result);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
