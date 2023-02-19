const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const maxAge = 1 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge, //Le token est valable pendant 1 jour
  });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password, role } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password, role });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(200).send({ err });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.json(token)
  } catch (err) {
    res.status(200).json(err);
  }
};



module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
