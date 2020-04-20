import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { getMeOrFail } from "../_helpers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Request x amount of mouthmasks
  if (req.method === "POST") {
    try {
      const me = await getMeOrFail(req);
      if (me.needs_mouthmask_amount > 0) {
        throw new Error("Can request mouthmasks only once!");
      }

      // Limit to 5 requested mouthmasks
      let amount = req.body.needs_mouthmask_amount;
      amount = Math.min(amount, 5);
      ///////////////////
      const requested = await db("user").where("user_id", me.user_id).update({
        needs_mouthmask: 1,
        needs_mouthmask_amount: amount,
      });
      return res.send({ requested });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const me = await getMeOrFail(req);
      if (me.needs_mouthmask && !req.body.needs_mouthmask) {
        // Turned off "need mouthmask"
        const updated = await db("user").where("user_id", me.user_id).update({
          needs_mouthmask: 0,
          needs_mouthmask_amount: 0,
        });
        return res.send({ updated });
      }
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }

  return res.send({});
};
