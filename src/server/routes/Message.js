import express from "express";
import { getMessageById, createMessage } from "../queries/messageQueries";

const router = express.Router();

// Route to get message by ID
router.get("/api/message/:messageId", async (req, res) => {
  const message_id = req.params.messageId;

  try {
    const message = await getMessageById({ message_id });
    res.status(200).json(message);
  } catch (error) {
    console.error("Error getting message:", error);
    res.status(500);
  }
});

// Route to create a message
router.post("/api/message", async (req, res) => {
  const { message_id, sender_id, receiver_id, content } = req.body;

  const messageInfo = {
    message_id,
    sender_id,
    receiver_id,
    content,
  };

  try {
    const newMessage = await createMessage(messageInfo);
    if (newMessage) res.status(200).json(newMessage);
    else res.status(500).json();
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500);
  }
});

export default router;
