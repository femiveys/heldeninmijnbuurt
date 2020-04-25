import { db } from "../../src/db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getFirebaseUser,
  getMe,
  getMeOrFail,
  updateUser,
  initFirebaseAdmin,
} from "../../src/apiHelpers/me";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Create myself
  if (req.method === "POST") {
    try {
      const { streetId } = req.body;
      if (!streetId) throw new Error("StreetId should have a value");

      initFirebaseAdmin();
      const firebaseUser = await getFirebaseUser(req);

      await db("user").insert({
        user_id: firebaseUser.uid,
        name: firebaseUser.name,
        email: firebaseUser.email,
        picture: firebaseUser.picture,
        street_id: streetId,
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

  // Update myself
  if (req.method === "PUT") {
    try {
      const firebaseUser = await getFirebaseUser(req);
      const result = await updateUser(firebaseUser.uid, req.body);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
