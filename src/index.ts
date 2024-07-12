import express from "express";
const app = express();
const port = process.env.PORT || 3000;

import { createPackage, createUser } from "./db/queries.js";

app.use(express.json());

console.log("hi");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user", async (req, res) => {
  const { address, city, firstName, phone, username } = req.body;
  if (!address || !city || !firstName || !phone || !username)
    return res.status(400).send("Missing fields.");
  try {
    await createUser({ address, city, firstName, phone, username });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
  return res.send("User created!");
});
app.post("/package", (req, res) => {
  const { durationDays, packageName, price, quota, speed } = req.body;
  if (!durationDays || !packageName || !price || !quota || !speed)
    return res.status(400).send("Missing fields.");
  try {
    createPackage({ durationDays, packageName, price, quota, speed });
  } catch (error) {
    return res.status(500).send(error);
  }
  return res.send("Package created!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
