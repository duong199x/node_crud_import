import express from "express";
import homeController from "../controller/homeController";
import multer, { MulterError } from "multer";
import path from "path";
var appRoot = require("app-root-path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });
const uploadMultiple = multer({
  storage: storage,
  fileFilter: imageFilter,
}).array("multiple-images", 3);
const router = express.Router();
const initWebRouter = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/detail/user/:id", homeController.getDetailPage);
  router.post("/create-new-user", homeController.createNewUser);
  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-user/:id", homeController.getEditUser);
  router.post("/update-user", homeController.updateUser);
  router.get("/upload", homeController.uploadFile);
  router.post(
    "/upload-multiple-file",
    (req, res, next) => {
      uploadMultiple(req, res, (err) => {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
          res.send("LIMIT_FILE");
        } else if (err) {
          res.send(err);
        } else {
          next();
        }
      });
    },
    homeController.handleUploadMultipleFile
  );
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homeController.handleUploadFile
  );
  router.get("/about", function (req, res) {
    res.send("about");
  });
  return app.use("/", router);
};
export default initWebRouter;
