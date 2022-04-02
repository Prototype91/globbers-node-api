import bodyParser from "body-parser";
import express, {Express} from "express";
import {RoutePaths} from "./enums/route-paths.enum";
import countryRouter from "./routes/country.routes";
import userRouter from "./routes/user.routes";

const app: Express = express();

app.use(bodyParser.json());

app.use(RoutePaths.Country, countryRouter);
app.use(RoutePaths.User, userRouter);

export default app;
