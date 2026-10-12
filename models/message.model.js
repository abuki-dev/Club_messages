const { pool } = require("../config/db");

async function selecrtAllMessages() {
  const result = await pool.query("select * from messages");
  return result.rows;
}
async function onlyMessage() {
  const result = await pool.query("select title ,body from messages");
  return result.rows;
}
async function insertBody(body) {
  const result = await pool.query(
    `insert into messages (title, body, author_id,author) values ($1, $2, $3,$4) returning title`,
    body,
  );
  return result.rows;
}
async function deleteBody(id) {
  const result = await pool.query(`delete  from messages where id ='${id}'`);
  return result.rows;
}
module.exports = { selecrtAllMessages, onlyMessage, insertBody, deleteBody };
