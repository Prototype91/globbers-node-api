import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import { RoutePaths } from './enums/route-paths.enum';
import countryRouter from './routes/country.routes';
import searchRouter from './routes/search.routes';
import userRouter from './routes/user.routes';

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(RoutePaths.Country, countryRouter);
app.use(RoutePaths.User, userRouter);
app.use(RoutePaths.Search, searchRouter);

export default app;
