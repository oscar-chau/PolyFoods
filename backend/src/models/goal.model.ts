import Goal from "../types/goal.type";
import db from "../database/index";
import { gcon } from "../helpers/models.helper";

class GoalModel {
  // create goal
  async create(g: Goal): Promise<Goal> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `INSERT INTO goals (user_id, calories, protein, fat, carbs)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, user_id, calories, protein, fat, carbs`;
      const result = await connection.query(sql, [
        g.user_id,
        g.calories,
        g.protein,
        g.fat,
        g.carbs
      ]);

      const sql2 = `SELECT id FROM users WHERE id=$1`;
      const result2 = await connection.query(sql2, [g.user_id]);
      connection.release();

      if (result2.rows.length == 0) {
        throw new Error(`User does not exist`);
      }

      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Unable to create Goal: ${(error as Error).message}`);
    }
  }

  // read
  async getByID(id: string): Promise<Goal> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `SELECT id, user_id, calories, protein, fat, carbs
            FROM goals
            WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();

      if (result.rows.length == 0) {
        throw new Error("Goal does not exist");
      }
      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `Goal with id:${id} failed to be read:${(error as Error).message}`
      );
    }
  }

  async update(g: Goal, id: string): Promise<Goal> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `UPDATE goals
            SET calories=$1, protein=$2, fat=$3, carbs=$4
            WHERE id=$5
            RETURNING id, user_id, calories, protein, fat, carbs`;
      const result = await connection.query(sql, [
        g.calories,
        g.protein,
        g.fat,
        g.carbs,
        id
      ]);
      connection.release();

      if (result.rows.length == 0) {
        throw new Error(`Goal does not exist`);
      }

      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `Goal with id:${id} failed to be read:${(error as Error).message}`
      );
    }
  }

  // delete
  async deleteByID(id: string): Promise<string> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `DELETE FROM goals
      WHERE id=$1
      RETURNING id`;
      const result = await connection.query(sql, [id]);
      connection.release();
      if (result.rows.length == 0) {
        throw new Error("Goal doesn't exist");
      }

      return result.rows[0].id;
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `User with id:${id} failed to delete: ${(error as Error).message}`
      );
    }
  }

  async getGoalByUserID(id: string): Promise<Goal> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `SELECT * FROM goals WHERE user_id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();
      if (result.rows.length == 0) {
        throw new Error("Goal or User doesnt exist");
      }

      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `Failed to get goal for User with id:${id} : ${(error as Error).message}`
      );
    }
  }
}

export default GoalModel;
