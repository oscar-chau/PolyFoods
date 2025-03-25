import pool from "../database/index";

const createMealTable = async () => {
  const queryText = `
    DROP TYPE IF EXISTS meal_type CASCADE;

    CREATE TYPE meal_type AS ENUM('Breakfast', 'Lunch', 'Dinner');

    CREATE TABLE meal (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        mtype meal_type,
        meal_date DATE
    );
    `;

  try {
    await pool.query(queryText);
    console.log("Meal Table created.");
  } catch (error) {
    console.log("Error creating Meal Table.", error);
  }
};

export default createMealTable;
