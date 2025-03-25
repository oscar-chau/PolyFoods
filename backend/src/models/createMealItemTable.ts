import pool from "../database/index";

const createMealItemTable = async () => {
  const queryText = `
    CREATE TABLE meal_item (
        item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
        meal_id INTEGER REFERENCES meal(id) ON DELETE CASCADE)
    `;

  try {
    await pool.query(queryText);
    console.log("MealItem Table created.");
  } catch (error) {
    console.log("Error creating MealItem Table.", error);
  }
};

export default createMealItemTable;
