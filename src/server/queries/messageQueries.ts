// CREATE TABLE message(
// 	message_id SERIAL PRIMARY KEY,
// 	sender_id VARCHAR(255) NOT NULL,
// 	receiver_id VARCHAR(255) NOT NULL,
// 	content TEXT NOT NULL,
// 	sent_at TIMESTAMP DEFAULT NOW(),
// 	CONSTRAINT fk_sender
// 		FOREIGN KEY (sender_id)
// 			REFERENCES "user"(user_id),
// 	CONSTRAINT fk_receiver
// 		FOREIGN KEY (receiver_id)
// 			REFERENCES "user"(user_id)
// );