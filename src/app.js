const express = require("express");
const app = express();
const { User } = require("../models/index");
const { Show } = require("../models/index");
const { db } = require("../db/connection");
const { seed } = require("../db/seed");
//Users - GET
app.get("/users", async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

//User by ID - GET

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const findUser = await User.findByPk(id);
  res.json(findUser);
});

// All shows watched by a user (user id in 'req.params)

app.get("/users/:userId/shows", async (req, res) => {
  const userWatched = await User.findByPk(req.params.userId, {
    include: [Show],
  });
  res.json(userWatched);
});

//ALL Shows - GET
app.get("/shows", async (req, res) => {
  const allMovies = await Show.findAll();
  res.json(allMovies);
});

//Shows by ID - GET

app.get("/shows/:id", async (req, res) => {
  const id = req.params.id;
  const findShow = await Show.findByPk(id);
  res.json(findShow);
});

// All Users who watched a show

app.get("/shows/:showId/users", async (req, res) => {
  const allShows = await Show.findByPk(req.params.showId, {
    include: [User],
  });
  res.json(allShows);
});

//CRUD - with PUT and later Delete
app.use(express.json());
app.use(express.urlencoded());

//Associate user with a show they watched:
app.put("/users/:userId/watched/:showId", async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  const show = await Show.findByPk(req.params.showId);

  await user.addShow(show);

  res.send(`User has been updated with recently watched`);
});

//Update the available property of a show

app.put("/shows/:showId", async (req, res) => {
  const show = await Show.findByPk(req.params.showId);
});
module.exports = app;
