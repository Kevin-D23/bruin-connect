 const userQueries = {
	createUser: `INSERT INTO "user" (email, first_name, last_name, profile_picture, bio, major) VALUES ($1, $2, $3, $4, $5, $6)`
}

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

export default userQueries