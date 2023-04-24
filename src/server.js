import express from "express";
import configViewEngine from "./configs/viewengine";
import initWebRouter from "./route/web";
require("dotenv").config();
const app = express();
const port = process.env.PORT;
//set up view engine
configViewEngine(app);
//init web router
initWebRouter(app);

app.listen(port, () => {
  console.log(`listening on port http://localhost ${port}`);
});
