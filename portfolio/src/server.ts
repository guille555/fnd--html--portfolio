import cors from "cors";
import express, { type Application } from "express";
import path from "node:path";

import * as dotenv from "dotenv";

import PortfolioRouter from "./routes/portfolio.routes.ts";

const app: Application = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(import.meta.dirname, "../public")));

app.use("/", PortfolioRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log("applicación corriendo en: " + process.env.SERVER_PORT);
});
