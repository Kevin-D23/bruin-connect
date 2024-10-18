// CREATE TABLE comment(
// 	comment_id SERIAL PRIMARY KEY,
// 	post_id INT NOT NULL,
// 	user_id VARCHAR(255) NOT NULL,
// 	content TEXT NOT NULL,
// 	created_at TIMESTAMP DEFAULT NOW(),
// 	CONSTRAINT fk_post,
// 		FOREIGN KEY (post_id)
// 			REFERENCES post(post_id)
// 	CONSTRAINT fk_user,
// 		FOREIGN KEY (user_id)
// 			REFERENCES "user"(user_id)
// );