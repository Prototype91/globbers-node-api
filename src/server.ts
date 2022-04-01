import db from './config/database.config';
import app from './app';

db.sync().then(() => {
  console.log('Connected to the database !');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port} !`);
});
