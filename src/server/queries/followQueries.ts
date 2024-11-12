// CREATE Table follow (
//     follower_user_id varchar NOT NULL,
//     followed_user_id varchar NOT NULL,
//     created_at timestamp DEFAULT NOW(),
// 	CONSTRAINT fk_follower
// 		FOREIGN KEY (follower_user_id)
// 			REFERENCES "user"(user_id),
// 	CONSTRAINT fk_followed
// 		FOREIGN KEY (followed_user_id)
// 			REFERENCES "user"(user_id)
// )