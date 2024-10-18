// CREATE TABLE club(
// 	club_id SERIAL PRIMARY KEY,
// 	club_name VARCHAR(50) UNIQUE NOT NULL,
// 	description TEXT,
// 	logo VARCHAR(255),
// 	"owner" VARCHAR(255) NOT NULL,
// 	created_at TIMESTAMP DEFAULT NOW(),
// 	CONSTRAINT fk_owner
// 		FOREIGN KEY("owner")
// 			REFERENCES "user"(user_id)
// );