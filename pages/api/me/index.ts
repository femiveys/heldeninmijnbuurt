import { db } from "../../../db";
import { NextApiRequest, NextApiResponse } from "next";
import { initFirebaseAdmin } from "../../../apiHelpers/me/firebaseAdmin";
import {
  getFirebaseUser,
  getMe,
  getMeOrFail,
} from "../../../apiHelpers/me/helpers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Create myself
  if (req.method === "POST") {
    try {
      console.log(req);
      const { streetId } = req.body;
      if (!streetId) throw new Error("StreetId should have a value");

      initFirebaseAdmin();
      const firebaseUser = await getFirebaseUser(req);

      await db("user").insert({
        user_id: firebaseUser.uid,
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

  // // Update myself
  // if (req.method === "PUT") {
  //   try {
  //     const me = await getMeOrFail(req);
  //     const updated = await db("user")
  //       .where("user_id", me.user_id)
  //       .update(omit(req.body, ["email", "picture", "user_id"]));
  //     res.send({ updated });
  //   } catch (error) {
  //     res.status(500).send({ error: error.message });
  //   }
  // }
};
