import pool from "../database/index";

const createLocationTable = async () => {
  const queryText = `
    CREATE TABLE location (
        id SERIAL PRIMARY KEY,
        venue_id INTEGER REFERENCES venues(id) ON DELETE CASCADE,
        name VARCHAR(100) UNIQUE NOT NULL,
        address VARCHAR(120)
    )
    `;

  try {
    await pool.query(queryText);
    console.log("Location Table created.");
  } catch (error) {
    console.log("Error creating Location Table.", error);
  }
};

export default createLocationTable;
