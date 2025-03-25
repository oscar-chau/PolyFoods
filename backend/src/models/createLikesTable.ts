import pool from "../database/index";

const createLikeTable = async () => {
  const queryText = `
    CREATE TABLE likes (
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        item_id INTEGER REFERENCES items(id) ON DELETE CASCADE
    )
    `;

  try {
    await pool.query(queryText);
    console.log("Likes Table created");
  } catch (error) {
    console.log("Error creating Likes table", error);
  }
};

export default createLikeTable;
