// CREATE TABLE membership(
// 	membership_id SERIAL PRIMARY KEY,
// 	user_id VARCHAR(255) NOT NULL,
// 	club_id INT NOT NULL,
// 	"role" VARCHAR(50) NOT NULL,
// 	created_at TIMESTAMP DEFAULT NOW(),
// 	CONSTRAINT fk_user
// 		FOREIGN KEY (user_id)
// 			REFERENCES "user"(user_id),
// 	CONSTRAINT fk_club
// 		FOREIGN KEY (club_id)
// 			REFERENCES club(club_id)
// );