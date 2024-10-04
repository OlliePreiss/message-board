const { query } = require("express");
const userStorage = require("../storages/userStorage");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 and 10 characters";

const validateUser = [
  body("firstName").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
  body("lastName").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
  body("email").trim()
    .isEmail().withMessage(`Please enter a valid email`),
  body("age").trim()
    .optional({ values: "falsy" })
    .isInt({ min: 18, max: 120 }).withMessage(`Enter an age between 18 and 120`),
  body("bio").trim()
    .optional({ values: "falsy" })
    .isLength({ max: 200 }).withMessage(`Too long`),
];


exports.userListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: userStorage.getUsers(),
    errorMessage: false
  });
};

exports.userCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

exports.userCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    userStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  }
];

exports.userUpdateGet = (req, res) => {
  const user = userStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user
  });
};

exports.userUpdatePost = [
  validateUser,
  (req, res) => {
    const user = userStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    userStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
    res.redirect("/");
  }
];

exports.userDeletePost = (req, res) => {
  userStorage.deleteUser(req.params.id);
  res.redirect("/");
};

exports.userSearchGet = (req, res) => {
  const users = userStorage.getUsers();
  const user = users.find(user => user.email === req.query.email )
  console.log(users)
  console.log(user)
  console.log(req.query.email)

  if (!user) {
    return res.status(400).render("index", {
      title: "User list",
      user: user,
      users: users,
      errorMessage: "User not found"
    })
  }

  res.render("search", {
    title: "User search",
    user: user
  })
}
