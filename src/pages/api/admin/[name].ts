import { NextApiRequest, NextApiResponse } from "next";
import { getUid } from "../../../apiHelpers/me";
import { getUsers } from "../../../apiHelpers/admin/users";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { name } = req.query;
      const uid = await getUid(req);

      let result;
      switch (name) {
        case "users":
          result = await getUsers(uid);
          break;

        default:
          break;
      }

      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
