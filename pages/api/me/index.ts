import { omit } from "lodash";
import { db } from "../../../db";
import { initFirebaseAdmin } from "../_firebaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";
import { getMe, getFirebaseUser, getMeOrFail } from "../_helpers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Create myself
  if (req.method === "POST") {
    try {
      initFirebaseAdmin();
      const firebaseUser = await getFirebaseUser(req);
      await db("users").insert({
        user_id: firebaseUser.uid,
        ...req.body,
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
  //     const updated = await db("users")
  //       .where("user_id", me.user_id)
  //       .update(omit(req.body, ["email", "picture", "user_id"]));
  //     res.send({ updated });
  //   } catch (error) {
  //     res.status(500).send({ error: error.message });
  //   }
  // }
};
