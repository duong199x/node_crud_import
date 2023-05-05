import express from "express";
import APIController from "../controller/APIController";
const router = express.Router();
const initApiRouter = (app) => {
  router.get("/user", APIController.getAllUsers);
  router.post("/create-user", APIController.createNewUser);
  router.put("/update-user", APIController.updateUser);
  router.delete("/delete-user/:id", APIController.deleteUser);
  return app.use("/app/v1/", router);
};
export default initApiRouter;
