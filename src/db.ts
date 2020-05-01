import knex from "knex";

export const db = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_USER,
  },
});
