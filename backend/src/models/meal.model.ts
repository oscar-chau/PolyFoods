import Meal from "../types/meal.type";
import db from "../database/index";
import { gcon } from "../helpers/models.helper";

class MealModel {
  async create(m: Meal): Promise<Meal> {
    let connection;
    try {
      connection = await db.connect();
      let sql = `SELECT FROM users WHERE id=$1`;
      const result = await connection.query(sql, [m.user_id]);
      if (result.rows.length == 0) {
        throw new Error("User doesn't exist");
      }
      sql = `INSERT INTO meal (user_id, mtype, meal_date)
            VALUES ($1, $2, $3)
            RETURNING id, user_id, mtype, meal_date`;
      const result2 = await connection.query(sql, [
        m.user_id,
        m.mtype,
        m.meal_date
      ]);
      connection.release();

      return result2.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Error creating meal: ${(error as Error).message}`);
    }
  }

  async getByID(id: string): Promise<Meal> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `SELECT id, user_id, mtype, meal_date
      FROM meal
      WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();

      if (result.rows.length == 0) {
        throw new Error("Meal doesnt exist");
      }

      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Failed to retrieve Meal: ${(error as Error).message}`);
    }
  }

  async update(m: Meal, id: string): Promise<Meal> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `UPDATE meal
      SET mtype = $1, meal_date = $2
      WHERE id=$3
      RETURNING id, user_id, mtype, meal_date`;

      const result = await connection.query(sql, [m.mtype, m.meal_date, id]);
      connection.release();

      if (result.rows.length === 0) {
        throw new Error("User doesn't exist");
      }

      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Unable to update Meal: ${(error as Error).message}`);
    }
  }

  async deleteByID(id: string): Promise<string> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `DELETE FROM meal
      WHERE id=$1
      RETURNING id`;
      const result = await connection.query(sql, [id]);
      connection.release();

      if (result.rows.length === 0) {
        throw new Error("Meal doesnt exist");
      }

      return result.rows[0].id;
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Unable to delete Meal: ${(error as Error).message}`);
    }
  }
}

export default MealModel;
