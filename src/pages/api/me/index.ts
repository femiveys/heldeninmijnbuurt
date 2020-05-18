import { db } from "../../../db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getMe,
  updateMe,
  getUserId,
  getMeOrFail,
  getFirebaseUser,
  getRealUserId,
} from "../../../apiHelpers/me";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Create myself
  if (req.method === "POST") {
    try {
      const { streetId, whatsapp } = req.body;
      if (!streetId) throw new Error("StreetId should have a value");

      const firebaseUser = await getFirebaseUser(req);
      const userId = await getRealUserId(firebaseUser);

      const email = firebaseUser.email || firebaseUser.providerData[0];

      await db("user").insert({
        user_id: userId,
        name: firebaseUser.displayName,
        email,
        street_id: streetId,
        is_tester: process.env.CREATE_TEST_USERS === "1" ? 1 : 0,
        whatsapp,
      });
      const me = await getMe(userId);
      res.send(me);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  // Get myself
  if (req.method === "GET") {
    try {
      const { userId, realUserId } = await getUserId(req);
      const me = await getMeOrFail(userId);
      res.send(me && { ...me, realUserId });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  // Get myself
  if (req.method === "PUT") {
    const { fields } = req.body;
    const { userId } = await getUserId(req);
    try {
      const result = await updateMe(userId, fields);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
