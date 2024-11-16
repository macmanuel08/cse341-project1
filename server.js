const express = require("express");
const app = express();
const routes = require("./routes/");
const env = require("dotenv");
const mongodb = require("./data/database");
const bodyParser = require("body-parser");
const cors = require("cors");
env.config();

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use("/", routes);

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and Node running on port ${port}`);
    });
  }
});
