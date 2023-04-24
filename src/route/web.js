import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();
const initWebRouter = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", function (req, res) {
    res.send("about");
  });
  return app.use("/", router);
};
export default initWebRouter;
