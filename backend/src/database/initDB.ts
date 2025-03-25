import pool from "./index";
import createUserTable from "../models/createUserTable";
import createGoalTable from "../models/createGoalTable";
import createMealTable from "../models/createMealTable";
import createItemTable from "../models/createItemTable";
import createMealItemTable from "../models/createMealItemTable";
import createVenueTable from "../models/createVenueTable";
import createLocationTable from "../models/createLocationTable";
import createDaysTable from "../models/createDaysTable";
import createAllergenTable from "../models/createAllergenTable";
import createAllergenItemTable from "../models/createAllergenItemTable";
import createLikeTable from "../models/createLikesTable";
const resetDatabase = async () => {
  try {
    // drop tables
    await pool.query("DROP TABLE IF EXISTS users CASCADE;");
    await pool.query("DROP TABLE IF EXISTS goals CASCADE");
    await pool.query("DROP TABLE IF EXISTS meal CASCADE");
    await pool.query("DROP TABLE IF EXISTS venues CASCADE");
    await pool.query("DROP TABLE IF EXISTS location CASCADE");
    await pool.query("DROP TABLE IF EXISTS working_days CASCADE");
    await pool.query("DROP TABLE IF EXISTS items CASCADE");
    await pool.query("DROP TABLE IF EXISTS meal_item CASCADE");
    await pool.query("DROP TABLE IF EXISTS allergen CASCADE");
    await pool.query("DROP TABLE IF EXISTS allergen_item CASCADE");
    await pool.query("DROP TABLE IF EXISTS likes CASCADE");

    // re-create tables
    await createUserTable();
    await createGoalTable();
    await createMealTable();
    await createVenueTable();
    await createLocationTable();
    await createDaysTable();
    await createItemTable();
    await createMealItemTable();
    await createAllergenTable();
    await createAllergenItemTable();
    await createLikeTable();

    console.log("Database fully initialized.");
  } catch (error) {
    console.log("Error resetting database: ", error);
  }

  process.exit();
};

resetDatabase();
