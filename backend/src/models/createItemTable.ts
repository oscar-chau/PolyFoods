import pool from "../database/index";

const createItemTable = async () => {
  const queryText = `
    CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        location_id INTEGER REFERENCES location(id) ON DELETE CASCADE,
        item_name VARCHAR(100) NOT NULL,
        calories INTEGER,
        protein INTEGER,
        fat INTEGER,
        carbs INTEGER
    )
    `;

  try {
    await pool.query(queryText);
    console.log("Item Table created.");
  } catch (error) {
    console.log("Error creating Item Table.", error);
  }
};

export default createItemTable;
