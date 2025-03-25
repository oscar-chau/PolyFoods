import pool from "../database/index";

const createAllergenTable = async () => {
  const queryText = `
    CREATE TABLE allergen (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50)
    )
    `;

  try {
    await pool.query(queryText);
    console.log("Allergen Table created.");
  } catch (error) {
    console.log("Error creating Allergen Table.", error);
  }
};

export default createAllergenTable;
