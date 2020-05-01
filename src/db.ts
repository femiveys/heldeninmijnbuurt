import knex from "knex";

export const db = knex({
  client: "mysql",
  connection: {
    host: "ID179346_mondmaskers.db.webhosting.be",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_USER,
  },
});
