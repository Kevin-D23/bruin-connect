// CREATE TABLE "user" (
// 	user_id VARCHAR(255) PRIMARY KEY,
// 	email VARCHAR(255) UNIQUE NOT NULL,
// 	first_name VARCHAR(100) NOT NULL,
// 	last_name VARCHAR(100) NOT NULL,
// 	profile_picture VARCHAR(255),
// 	bio TEXT,
// 	major VARCHAR(50),
// 	created_at TIMESTAMP DEFAULT NOW()
// );

import db from "../db";

type User = {
  user_id: String;
  email: String;
  first_name: String;
  last_name: String;
  profile_picture: String;
  bio: String;
  major: String;
  pronouns: String;
};

// Get user by id
// Return:
// {
//   user_id: String;
//   first_name: String;
//   last_name: String;
//   profile_picture;
//   bio: String;
//   major: String;
//   pronouns: String;
// }
export async function getUserById({ user_id }: User) {
  const query = `SELECT user_id, first_name, last_name, profile_picture, bio, major, pronouns FROM "user" WHERE user_id = ($1)`;
  const values = [user_id];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting user:", error);
  }
}

// Get userId by email
// Return:
// {
//   user_id: String;
// }
export async function getUserByEmail({ email }: User) {
  const query = `SELECT user_id, first_name, last_name, profile_picture, bio, major, pronouns FROM "user" WHERE email = ($1)`;
  const values = [email];
  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting user:", error);
  }
}

// Creates a user instance
export async function createUser({
  user_id,
  email,
  first_name,
  last_name,
  profile_picture,
  bio,
  major,
  pronouns,
}: User) {
  const query = `INSERT INTO "user" (user_id, email, first_name, last_name, profile_picture, bio, major, pronouns) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id`;
  const values = [
    user_id,
    email,
    first_name,
    last_name,
    profile_picture,
    bio,
    major,
    pronouns,
  ];
  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
