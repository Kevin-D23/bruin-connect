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

import db from "../db";

type Club = {
  club_id: String;
  club_name: String;
  description: String;
  logo: String;
};

// Get user by id
// Return:
// {
// club_id: String;
// club_name: String;
// description: String;
// logo:String;
// }
export async function getClubById({ club_id }: Club) {
  const query = `SELECT club_id, club_name, description, logo FROM "user" WHERE user_id = ($1)`;
  const values = [club_id];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting club:", error);
  }
}

// Creates a club instance
export async function createClub({
  club_id,
  club_name,
  description,
  logo,
}: Club) {
  const query = `INSERT INTO club (club_id, club_name, description, logo) VALUES ($1, $2, $3, $4) RETURNING club_id`;
  const values = [club_id, club_name, description, logo];
  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating club:", error);
  }
}
