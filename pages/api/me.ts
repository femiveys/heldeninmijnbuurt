import { omit } from "lodash";
import { db } from "../../db";
import { initFirebaseAdmin, getFirebaseUser } from "./_firebaseAdmin";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      initFirebaseAdmin();
      const firebaseUser = await getFirebaseUser(req);
      const me = await db("users")
        .where("user_id", firebaseUser.user_id)
        // .select(USER_FIELDS)
        .first();
      res.send({ ...me, picture: firebaseUser.picture });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      initFirebaseAdmin();
      const firebaseUser = await getFirebaseUser(req);
      const updated = await db("users")
        .where("user_id", firebaseUser.user_id)
        .update(omit(req.body, ["email", "picture", "user_id"]));
      res.send({ updated });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
