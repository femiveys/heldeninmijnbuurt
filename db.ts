import knex from "knex";

export const db = knex({
  client: "mysql",
  connection: {
    host: "ID179346_mondmaskers.db.webhosting.be",
    user: "ID179346_mondmaskers",
    password: "CpJuxxtgy2P49aLu",
    database: "ID179346_mondmaskers",
  },
});
