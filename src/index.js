```js
import express from "express";
import { checkUser } from "./auth.js";
import { connect, isConnected, getUsers, addUser } from "./db.js";

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

// API
app.get("/api/health", (req,res)=> res.json({ ok:true, db:isConnected() }));
app.get("/api/users", async (req,res)=>{
  try { res.json(await getUsers()); }
  catch(e){ res.status(500).json({error:e.message}); }
});
app.post("/api/users", async (req,res)=>{
  try { const id = await addUser(req.body.name); res.json({ id }); }
  catch(e){ res.status(500).json({error:e.message}); }
});

// DB connect on startup
(async () => {
  try {
    await connect();
    console.log("DB connected:", isConnected());
  } catch (e) {
    console.error("DB failed:", e.message);
  }
})();

app.listen(3000, () => console.log("Server on http://localhost:3000"));