// CREATE TABLE message(
// 	message_id SERIAL PRIMARY KEY,
// 	sender_id VARCHAR(255) NOT NULL,
// 	receiver_id VARCHAR(255) NOT NULL,
// 	content TEXT NOT NULL,
// 	created_at TIMESTAMP DEFAULT NOW(),
// 	CONSTRAINT fk_sender
// 		FOREIGN KEY (sender_id)
// 			REFERENCES "user"(user_id),
// 	CONSTRAINT fk_receiver
// 		FOREIGN KEY (receiver_id)
// 			REFERENCES "user"(user_id)
// );

import db from "../db";

type Message = {
  message_id: String;
  sender_id: String;
  receiver_id: String;
  content: String;
};

// Get user by id
// Return:
// {
// message_id: String;
// sender_id: String;
// receiver_id: String;
// content: String;
// }
export async function getUserById({ message_id }: Message) {
  const query = `SELECT message_id, sender_id, receiver_id, content, created_at FROM message WHERE message_id = ($1)`;
  const values = [message_id];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting message:", error);
  }
}

// Creates a user instance
export async function createMessage({
  message_id,
  sender_id,
  receiver_id,
  content,
}: Message) {
  const query = `INSERT INTO message (message_id, sender_id, receiver_id, content) VALUES ($1, $2, $3, $4) RETURNING message_id`;
  const values = [message_id, sender_id, receiver_id, content];
  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating message:", error);
  }
}
