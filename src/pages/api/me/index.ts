import { db } from "../../../db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getFirebaseUser,
  getMe,
  getMeOrFail,
  initFirebaseAdmin,
  getUid,
  updateMe,
} from "../../../apiHelpers/me";
import { CREATE_TEST_USERS } from "../../../helpers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Create myself
  if (req.method === "POST") {
    try {
      const { streetId, whatsapp } = req.body;
      if (!streetId) throw new Error("StreetId should have a value");

      initFirebaseAdmin();
      const firebaseUser = await getFirebaseUser(req);

      await db("user").insert({
        user_id: firebaseUser.uid,
        name: firebaseUser.name,
        email: firebaseUser.email,
        // picture: firebaseUser.picture,
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
    const uid = await getUid(req);
    try {
      const result = await updateMe(uid, fields);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
