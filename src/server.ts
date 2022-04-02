import app from './app';
import db from './config/database.config';

db.sync().then(() => {
  console.log('Drop and re-sync db.');
});

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Working!!!'));

app.listen(port, () => {
  console.log(`Server is running on port ${port} !`);
});
