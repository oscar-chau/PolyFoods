import pool from "../database/index";

const createGoalTable = async () => {
  const queryText = `
    CREATE TABLE goals (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        calories INTEGER,
        protein INTEGER,
        fat INTEGER,
        carbs INTEGER,
        UNIQUE(user_id)
    )
    `;

  try {
    await pool.query(queryText);
    console.log("Goal Table created.");
  } catch (error) {
    console.log("Error creating Goal Table.", error);
  }
};

export default createGoalTable;
