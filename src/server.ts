import app from './app';
import db from './config/database.config';
import { localPort } from './constants/port.const';
import { Associations } from './models/associations';

db.sync()
  .then(() => {
    console.log('Drop and re-sync db.');
  })
  .catch(err => console.log('Une erreur est survenue : ', err));

Associations.associate();

const port = process.env.PORT || localPort;

app.listen(port, () => {
  console.log(`Server is running on port ${port} !`);
});
