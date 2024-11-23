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

import db from "../db";

type Post = {
  post_id: String;
  user_id: String;
  club_id: String;
  content: String;
  images: [String];
  created_at: String;
};

// retrieve a post by its ID
export async function getPostById({ post_id }: Post) {
  const query = `SELECT post_id, user_id, club_id, content, images, created_at, FROM "user" WHERE post_id = ($1)`;
  const values = [[post_id]];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting post:", error);
  }
}

// Creates a post instance
export async function createPost({
  post_id,
  user_id,
  club_id,
  content,
  images,
}: Post) {
  const query = `INSERT INTO post (post_id, user_id, club_id, content, images) VALUES ($1, $2, $3, $4, $5, $6) RETURNING post_id`;
  const values = [post_id, user_id, club_id, content, images];
  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
