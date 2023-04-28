import pool from "../configs/connectDB";
let getHomePage = async (req, res) => {
  // simple query
  let data = [];
  // connection.query("SELECT * FROM `user`", function (err, results, fields) {
  //   console.log(">> check out");
  //   console.log(results); // results contains rows returned by server
  //   results.map((row) => {
  //     data.push({
  //       id: row.id,
  //       email: row.email,
  //       address: row.address,
  //       firstName: row.firstName,
  //       lastName: row.lastName,
  //     });
  //   });
  // });
  const [rows, fields] = await pool.execute("SELECT * FROM `user`");
  return res.render("index.ejs", { dataUser: rows });

  console.log(">>>>", rows);
};
const getDetailPage = async (req, res) => {
  let userId = req.params.id;
  const user = await pool.execute("SELECT * FROM `user` where `id` = ?", [
    userId,
  ]);
  console.log("ok", user);
  return res.send(JSON.stringify(user[0]));
};
const createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "INSERT INTO user(firstName, lastName, email, address) values (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};
module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser,
};
