import express from "express";
import db from "./db.js";
import { createUser, getUser } from "./queries/userQueries.ts";

const PORT = process.env.PORT ?? 8000;
const app = express();

app.use(express.json());

// Route to get user
app.get("/api/user", async (req, res) => {
  const { user_id } = req.body;

  try {
    const user = await getUser({ user_id });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500);
  }
});

// Route to create a user
app.post("/api/user", async (req, res) => {
  const { user_id, email, first_name, last_name, major, pronouns } = req.body;
  const userInfo = { user_id, email, first_name, last_name, major, pronouns };

  try {
    const newUser = await createUser(userInfo);
    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
