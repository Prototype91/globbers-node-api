import bodyParser from "body-parser";
import express, {Express} from "express";
import {RoutePaths} from "./enums/route-paths.enum";
import countryRouter from "./routes/country.routes";
import userRouter from "./routes/user.routes";
import cors from 'cors';

const app: Express = express();

app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(RoutePaths.Country, countryRouter);
app.use(RoutePaths.User, userRouter);

export default app;
