import express from "express";
import { checkUser } from "./auth.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home
app.get("/", (req, res) => res.send("Hello from main!"));

// Auth
app.post("/login", (req, res) => {
  const ok = checkUser(req.body.username, req.body.password);
  return ok ? res.send("Login success") : res.status(401).send("Invalid");
});

app.listen(3000, () => console.log("Server on http://localhost:3000"));
