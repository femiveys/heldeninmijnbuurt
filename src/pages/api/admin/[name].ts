import { NextApiRequest, NextApiResponse } from "next";
import { getUserId } from "../../../apiHelpers/me";
import { getUsers } from "../../../apiHelpers/admin/users";
import { getRelations } from "../../../apiHelpers/admin/relations";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { name } = req.query;
      const { userId } = await getUserId(req);

      let result;
      switch (name) {
        case "users":
          result = await getUsers(userId);
          break;

        case "relations":
          result = await getRelations(userId);
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
