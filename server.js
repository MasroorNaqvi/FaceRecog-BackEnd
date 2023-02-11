const express = require("express");
const cors = require("cors");
const becrypt = require("bcrypt-nodejs");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "mysql2",
  connection: {
    host: "34.28.45.64",
    user: "root",
    password: "",
    database: "smart_brain",
  },
});

const app = express();
app.use(express.json());

app.use(cors());

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, becrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, becrypt);
});

app.put("/image", (req, res) => {
  image.handleimage(req, res, db);
});

app.listen(3000, () => {
  console.log("app is running");
});
