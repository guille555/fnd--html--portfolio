import cors from "cors";
import express, { type Application } from "express";
import path from "node:path";
import * as dot from "dotenv";

import PortfolioRouter from "./routes/portfolio.routes.ts";

const app: Application = express();

dot.config();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(import.meta.dirname, "../public")));

app.use("/", PortfolioRouter);

app.listen(parseInt(process.env.SERVER_PORT!), () => {
  console.log("applicación corriendo en: " + parseInt(process.env.SERVER_PORT!));
});
