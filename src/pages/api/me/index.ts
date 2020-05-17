import { db } from "../../../db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getFirebaseUser,
  getMe,
  getMeOrFail,
  initFirebaseAdmin,
  getUserId,
  updateMe,
  getUserIdFromFirebaseUser,
} from "../../../apiHelpers/me";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Create myself
  if (req.method === "POST") {
    try {
      const { streetId, whatsapp } = req.body;
      if (!streetId) throw new Error("StreetId should have a value");

      initFirebaseAdmin();
      const firebaseUser = await getFirebaseUser(req);

      await db("user").insert({
        user_id: getUserIdFromFirebaseUser(firebaseUser),
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        street_id: streetId,
        is_tester: process.env.CREATE_TEST_USERS === "1" ? 1 : 0,
        whatsapp,
      });
      const me = await getMe(req);
      res.send(me);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  // Get myself
  if (req.method === "GET") {
    try {
      const me = await getMeOrFail(req);
      res.send(me);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  // Get myself
  if (req.method === "PUT") {
    const { fields } = req.body;
    const userId = await getUserId(req);
    try {
      const result = await updateMe(userId, fields);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
