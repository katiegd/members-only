const { body, validationResult } = require("express-validator");
const pool = require("../models/db");
const bcrypt = require("bcryptjs");

const validateSignUp = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom(async (value) => {
      const { rows } = await pool.query(
        "SELECT * FROM members WHERE username = $1",
        [value]
      );
      if (rows.length > 0) {
        throw new Error("Email already in use.");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character."),
  body("password2").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
];

async function signUpGet(req, res) {
  res.render("signup", { errors: [], data: {} });
}

async function signUpPost(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .render("signup", { errors: errors.array(), data: req.body });
  }
  const {
    firstName,
    lastName,
    email: username,
    password: plainPassword,
  } = req.body;

  try {
    const password = await bcrypt.hash(plainPassword, 10);
    await pool.query(
      "INSERT INTO members (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)",
      [firstName, lastName, username, password]
    );
    res.redirect("/login");
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  signUpGet,
  signUpPost,
  validateSignUp,
};
