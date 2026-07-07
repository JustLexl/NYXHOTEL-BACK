require("dotenv").config();
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { BaseError } from "./shared/classes/base-error";
import { buildErrorMessage } from "./shared/classes/error-handler";
import { initializeMongo } from "./shared/database/mongodb";
import { router } from "./api/router";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "70mb" }));
app.use(bodyParser.urlencoded({ limit: "70mb", extended: true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(initializeMongo);
app.use("/api", router);

app.use(errorMiddleware);

app.listen(port, function () {
  console.log(` Server listening on http://localhost:${port}`);
});

async function errorMiddleware(
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log("CATCH BY ERROR MIDDLEWARE");
  console.log(err);
  if (err instanceof BaseError) {
    res.status(err.httpCode).send(buildErrorMessage(err));
    return;
  }
  res.status(500).send(buildErrorMessage(err));
}
