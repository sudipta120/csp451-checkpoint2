import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => res.send("Hello from main!"));

app.listen(3000, () => console.log("Server on http://localhost:3000"));
