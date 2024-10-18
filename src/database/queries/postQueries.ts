// CREATE TABLE post(
// 	post_id SERIAL PRIMARY KEY,
// 	user_id VARCHAR(255),
// 	club_id INT,
// 	content TEXT NOT NULL,
// 	images VARCHAR(255)[],
// 	created_at TIMESTAMP DEFAULT NOW(),
// 	CONSTRAINT fk_user
// 		FOREIGN KEY (user_id)
// 			REFERENCES "user"(user_id),
// 	CONSTRAINT fk_club
// 		FOREIGN KEY (club_id)
// 			REFERENCES club(club_id)
// );