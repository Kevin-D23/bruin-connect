import express from "express";
import db from "./db.js";
import {
  createUser,
  getUserById,
  getUserByEmail,
} from "./queries/userQueries.ts";
import cors from "cors";

const PORT = process.env.PORT ?? 8000;
const app = express();

app.use(express.json());
app.use(cors());

// Route to get user by ID
app.get("/api/user/:userId", async (req, res) => {
  const user_id = req.params.userId;

  try {
    const user = await getUserById({ user_id });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500);
  }
});

// Route to get user by email
app.post("/api/user/email", async (req, res) => {
  const { email } = req.body; // Get email from request body
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await getUserByEmail({ email });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user by email:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to create a user
app.post("/api/user", async (req, res) => {
  const { user_id, email, first_name, last_name, major, pronouns } = req.body;
  const userInfo = { user_id, email, first_name, last_name, major, pronouns };
  try {
    const newUser = await createUser(userInfo);
    if (newUser) res.status(200).json(newUser);
    else res.status(500).json();
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
