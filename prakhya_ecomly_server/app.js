console.log("Jai Shree Ram");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
const env = process.env;
const API = env.API_URL;
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());

const authRouter = require("./routes/auth");

const hostname = env.HOSTNAME;
const port = env.PORT;

app.use(`${API}`,authRouter);

mongoose
  .connect(env.MOGODB_CONNECTION_STRING)
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});
