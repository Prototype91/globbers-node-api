import app from './app';
import db from "./config/database.config";

db.sync().then(() => {
    console.log("Drop and re-sync db.");
});

const port = 3000;

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running on port ${port} !`);
});
