const { pool } = require("../config/db");

async function insertNewuser(user) {
  const result = await pool.query(
    `insert into users (fullname,username,email,password) values ($1,$2,$3,$4) returning username`,
    user,
  );

  return result.rows;
}

async function findByemail(email) {
  const result = await pool.query(
    `select * from users where email ='${email}'`,
  );
  return result.rows;
}
async function findByemailorUsername(value) {
  const result = await pool.query(
    `select * from users where email ='${value}' or username ='${value}' `,
  );
  return result.rows;
}

async function findById(id) {
  const result = await pool.query(`select * from users where id = '${id}'`);
  return result.rows;
}
async function upgradeUser(id, role) {
  const result = await pool.query(
    `update users set is_${role}='true' where id ='${id}' returning is_${role}`,
  );
  return result.rows;
}
module.exports = {
  insertNewuser,
  findByemail,
  findById,
  findByemailorUsername,
  upgradeUser,
};
