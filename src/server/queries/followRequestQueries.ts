// CREATE Table followRequest (
//     requester_user_id varchar NOT NULL,
//     requestee_user_id varchar NOT NULL,
//     created_at timestamp DEFAULT NOW(),
// 	CONSTRAINT fk_requester
// 		FOREIGN KEY (requester_user_id)
// 			REFERENCES "user"(user_id),
// 	CONSTRAINT fk_requestee
// 		FOREIGN KEY (requestee_user_id)
// 			REFERENCES "user"(user_id)
// )