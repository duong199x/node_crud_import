import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();
const initWebRouter = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/detail/user/:id", homeController.getDetailPage);
  router.post("/create-new-user", homeController.createNewUser);
  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-user/:id", homeController.getEditUser);
  router.post("/update-user", homeController.updateUser);
  router.get("/upload", homeController.uploadFile)
  router.get("/about", function (req, res) {
    res.send("about");
  });
  return app.use("/", router);
};
export default initWebRouter;
