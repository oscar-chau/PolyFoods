import pool from "../database/index";

const createVenueTable = async () => {
  const queryText = `
    CREATE TABLE venues (
        id SERIAL PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        address VARCHAR(120) NOT NULL,
        UNIQUE(name)
    )
    `;

  try {
    await pool.query(queryText);
    console.log("Venue Table created.");
  } catch (error) {
    console.log("Error creating Venue Table.", error);
  }
};

export default createVenueTable;
