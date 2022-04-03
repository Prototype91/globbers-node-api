import app from './app';
import db from './config/database.config';
import { Associations } from './models/association';

db.sync()
  .then(() => {
    console.log('Drop and re-sync db.');
  })
  .catch(err => console.log('Une erreur est survenue : ', err));

Associations.associate();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port} !`);
});
