import express from 'express';

const app = express();
const port = 8080;

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Hello world!');
});

app.listen(port, (): void => {
  console.log(`server started at http://localhost:${port}`);
});
