console.log("Jai Shree Ram");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");
const authJwt = require('./middleware/jwt');
const errorHandler = require('./middleware/error_handler');



const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const categoriesRouter = require('./routes/categories');
const productRouter = require('./routes/products');

const env = process.env;
const API = env.API_URL;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler); 


// Routes
app.use(`${API}/`, authRouter);
app.use(`${API}/users`,userRouter);
app.use(`${API}/admin`,adminRouter);
app.use(`${API}/categories`,categoriesRouter);
app.use(`${API}/products`,productRouter)
app.use('/public',express.static(__dirname + '/public'));




app.get(`${API}/users`, (req, res) => {
  return res.json([{ name: 'Pragati', org: 'dbstech', age: 150 }]);
});

// Error handler (LAST)

// DB
mongoose.connect(env.MOGODB_CONNECTION_STRING)
  .then(() => console.log("connected to database"))
  .catch((error) => console.error(error)); 

// Server
app.listen(env.PORT, env.HOSTNAME, () => {
  console.log(`server running at http://${env.HOSTNAME}:${env.PORT}`);
});