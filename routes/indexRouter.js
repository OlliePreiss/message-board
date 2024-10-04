const { Router } = require('express');

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello world!",
    user: "Charles",
    added: new Date()
  }
];

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
})
indexRouter.get("/new", (req, res) => {
  res.render("form");
})
indexRouter.post("/new", (req, res) => {
  messages.push({ text: req.body.message, user: req.body.name, added: new Date()});
  res.redirect("/");
})


module.exports = indexRouter;
