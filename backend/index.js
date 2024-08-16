const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

dotenv.config({ path: "./.env" });
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
app.use(cors());


require("./config/database");
app.use(express.json());

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Accès refusé" });
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authenticate: Access denied" });
  }
};

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User succesfully created" });
  } catch (error) {
    res.status(500).json({
      error: "Error while creating user",
      details: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while login", details: error.message });
  }
});

app.get("/users", authenticate, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: "Error while trying to get users list",
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`index.js: Server listening on port: ${port}`);
});
