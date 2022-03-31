import bodyParser from "body-parser";
import express, { Express } from "express";
import countryRouter from "./routes/country.routes";

const app: Express = express();

app.use(bodyParser.json());

app.use("/country", countryRouter);

export default app;
