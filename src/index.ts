import { json, urlencoded } from "body-parser";
import express from "express";
import { config } from "./config";
import rootRouter from "./route";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/", rootRouter);

app.listen(config.port, () => {
  console.log("Running");
});
