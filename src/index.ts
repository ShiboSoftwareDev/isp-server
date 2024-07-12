import express from "express";
const app = express();
const port = 3000;
import { createUser } from "./db/queries.js";

console.log("sdsdfdsfs dsd sd");

app.get("/", (req, res) => {
  res.send("Hello World!");
  createUser({ age: 5, name: "ahmer", email: "bro" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
