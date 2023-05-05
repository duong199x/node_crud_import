import pool from "../configs/connectDB";
// lấy dữ liệu từ đb
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
};
//lấy dữ liệu
const getDetailPage = async (req, res) => {
  let userId = req.params.id;
  const user = await pool.execute("SELECT * FROM `user` where `id` = ?", [
    userId,
  ]);
  return res.send(JSON.stringify(user[0]));
};
//tạo mới người dùng
const createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "INSERT INTO `user`(firstName, lastName, email, address) values (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};
//xóa người dùng
const deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("DELETE FROM `user` WHERE `id` = ?", [userId]);
  return res.redirect("/");
};
//lấy thông tin sửa người dùng
const getEditUser = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute("select * from `user` where `id` = ?", [id]);
  return res.render("update.ejs", { dataUser: user[0] });
};
//sửa người dùng
const updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    "UPDATE user SET firstName = ?, lastName = ?, email = ? , address = ?  WHERE id = ?",
    [firstName, lastName, email, address, id]
  );
  res.redirect("/");
};
const uploadFile = async (req, res) => {
  return res.render("uploadFile.ejs");
};

module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditUser,
  updateUser,
  uploadFile,
};
