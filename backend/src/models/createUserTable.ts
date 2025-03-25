import pool from "../database/index";

const createUserTable = async () => {
  const queryText = `
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        first_name VARCHAR(40) NOT NULL,
        last_name VARCHAR(40) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )
    `;

  try {
    await pool.query(queryText);
    console.log("User Table created.");
  } catch (error) {
    console.log("Error creating User Table.", error);
  }
};

export default createUserTable;
