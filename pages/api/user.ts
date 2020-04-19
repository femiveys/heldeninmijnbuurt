import { db } from "../../db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { firebase_user_id } = req.body;
      const user = await db("users").insert({ user_id: firebase_user_id });
      res.send({ user });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
