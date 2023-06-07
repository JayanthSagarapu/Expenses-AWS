const express = require("express");
const app = express();

const cors = require("cors");

const routes = require("./routes/router");

const { sequelize, UserDetails } = require("./models/UserDb");
const port = 8080;

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

sequelize.sync().then(
  app.listen(port, () => {
    console.log("running");
  })
);
