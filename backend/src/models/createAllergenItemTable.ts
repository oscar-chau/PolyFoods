import pool from "../database/index";

const createAllergenItemTable = async () => {
  const queryText = `
    CREATE TABLE allergen_item (
        allergen_id INTEGER REFERENCES allergen(id) ON DELETE CASCADE,
        item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
        PRIMARY KEY (allergen_id, item_id)
    )
    `;

  try {
    await pool.query(queryText);
    console.log("AllergenItem Table created.");
  } catch (error) {
    console.log("Error creating AllergenItem Table.", error);
  }
};

export default createAllergenItemTable;
