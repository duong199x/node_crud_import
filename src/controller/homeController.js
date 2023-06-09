import pool from "../configs/connectDB";
import multer from "multer";
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
const upload = multer().single("profile_pic");
const handleUploadFile = async (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
    );
  });
};
const handleUploadMultipleFile = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.send("Please select an image to upload");
  }

  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="/upload">Upload more images</a>';
  res.send(result);
};
module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditUser,
  updateUser,
  uploadFile,
  handleUploadFile,
  handleUploadMultipleFile,
};
