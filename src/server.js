import express from "express";
import configViewEngine from "./configs/viewengine";
import initWebRouter from "./route/web";
import connection from "./configs/connectDB";
require("dotenv").config();
const app = express();
const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//set up view engine
configViewEngine(app);
//init web router
initWebRouter(app);

app.listen(port, () => {
  console.log(`listening on port http://localhost ${port}`);
});
