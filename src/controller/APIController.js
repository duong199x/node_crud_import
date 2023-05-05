import pool from "../configs/connectDB";
let getAllUsers = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `user`");
  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};
let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: "error",
    });
  }
  await pool.execute(
    "INSERT INTO `user`(firstName, lastName, email, address) values (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );
  return res.status(200).json({
    message: "ok",
  });
};
const updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  if (!firstName || !lastName || !email || !address || !id) {
    return res.status(200).json({
      message: "error",
    });
  }
  await pool.execute(
    "UPDATE user SET firstName = ?, lastName = ?, email = ? , address = ?  WHERE id = ?",
    [firstName, lastName, email, address, id]
  );
  return res.status(200).json({
    message: "ok",
  });
};
const deleteUser = async (req, res) => {
  let userId = req.params.id;
  if (!userId) {
    return res.status(200).json({
      message: "error",
    });
  }
  await pool.execute("DELETE FROM `user` WHERE `id` = ?", [userId]);
  return res.status(200).json({
    message: "ok",
  });
};
module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
