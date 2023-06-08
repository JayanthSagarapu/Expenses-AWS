const express = require("express");
const app = express();

const cors = require("cors");

const routes = require("./routes/router");

const sequelize = require("./util/database");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", routes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
