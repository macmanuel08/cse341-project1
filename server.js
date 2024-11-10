const express = require('express');
const app = express();
const routes = require('./routes/contacts');
const env = require("dotenv");
const mongodb = require("./data/database");
env.config();

app.use('/', routes);

const port = process.env.PORT || 3000;

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and Node running on port ${port}`);
        });
    }
})