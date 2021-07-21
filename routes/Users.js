const express = require("express");
const Users = require("../models/Users");
const auth = require("../middleware/auth");
const router = express.Router();

//Create User Route
router.post("/", async (req, res) => {
  try {
    const user = await new Users(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    
    res.send({ user, token });
  } catch (e) {
    res.status(500).send(e);
  }
});
//Get User Route
router.get("/me", auth, (req, res) => {
  res.status(200).send(req.user);
});

//Update User Route
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "Email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = req.user;

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
//Delete User Route
router.delete("/user/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
    res.status(200).send(user);
  } catch (e) {}
});
module.exports = router;
