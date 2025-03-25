import pool from "../database/index";

const createDaysTable = async () => {
  const queryText = `
    CREATE TABLE working_days (
        location_id INTEGER REFERENCES location(id) ON DELETE CASCADE,
        day DATE,
        opening_time DATE,
        closing_item DATE
    )
    `;

  try {
    await pool.query(queryText);
    console.log("WorkingDays Table created.");
  } catch (error) {
    console.log("Error creating WorkingDays Table.", error);
  }
};

export default createDaysTable;
