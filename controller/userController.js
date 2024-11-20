const { generateToken } = require("../jwt/jwtUtils");
const userSchema = require("../model/userModel");
const bcrypt = require("bcrypt");

exports.showData = async (req, res) => {
  try {
    const userData = await userSchema.find({});
    res.status(200).json({
      status: "Success",
      message: "Data Found Successfully.",
      data: { userData },
    });
  } catch (error) {
    res.status(400).json({
      status: error.message,
      message: "Data not Found",
    });
  }
};

exports.signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(password, salt);
    const userData = await userSchema.create({
      username,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      status: "Success",
      message: "User Created Successfully",
      data: { userData },
    });
  } catch (error) {
    res.status(400).json({
      status: error.message,
      message: "Data not Created",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill Username and Password",
      });
    }

    const user = await userSchema.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = generateToken(user.toObject());
      return res.status(200).json({
        success: true,
        message: "Authentication successful!",
        token: token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: error.message,
      message: "Something went wrong",
    });
  }
};
