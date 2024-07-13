import express from "express";
const app = express();
const port = process.env.PORT || 3000;

import {
  createPackage,
  createUser,
  deletePackage,
  deleteUser,
  getPackage,
  getUser,
} from "./db/queries.js";

app.use(express.json());

console.log("welcome");

app.get("/", (req, res) => {
  const message = JSON.stringify({
    "/user": {
      get: "returns all users",
      post: `insert a user with fields: id: number;
    firstName: string;
    username: string;
    lastName: string | null;
    address: string;
    state: string | null;
    country: string;
    city: string;
    expirationDate: Date;
    email: string | null;
    phone: number;
    balance: number;
    quota: number;
    packageId: number | null;`,
    },
    "/user/:id": { delete: "deletes a user with the specified id" },
    "/package": {
      get: "returns all packages",
      post: `inserts a package with fields: id: number;
    quota: number;
    packageName: string;
    price: number;
    speed: number;
    durationDays: number;`,
    },
    "/package/:id": { delete: "deletes a package with the specified id" },
    note: "'| null' means the field is optional",
  });
  res.send(message);
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

app.get("/user", async (req, res) => {
  try {
    const users = await getUser();
    return res.send(users);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("specify id");
  try {
    await deleteUser(Number(id));
    return res.send("positive");
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.post("/package", async (req, res) => {
  const { durationDays, packageName, price, quota, speed } = req.body;
  if (!durationDays || !packageName || !price || !quota || !speed)
    return res.status(400).send("Missing fields.");
  try {
    await createPackage({ durationDays, packageName, price, quota, speed });
  } catch (error) {
    return res.status(500).send(error);
  }
  return res.send("Package created!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/package", async (req, res) => {
  try {
    const packages = await getPackage();
    return res.send(packages);
  } catch (error) {
    return res.status(500).send(error);
  }
});
app.delete("/package/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("specify id");
  try {
    await deletePackage(Number(id));
    return res.send("positive");
  } catch (error) {
    return res.status(500).send(error);
  }
});
