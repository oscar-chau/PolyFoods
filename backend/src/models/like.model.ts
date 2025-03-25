import Like from "../types/like.type";
import db from "../database/index";
import { gcon } from "../helpers/models.helper";
import Item from "../types/item.type";

class LikeModel {
  async create(l: Like): Promise<Like> {
    let connection;
    try {
      connection = await db.connect();

      let sql = `SELECT FROM users WHERE id=$1`;
      const user_result = await connection.query(sql, [l.user_id]);
      if (user_result.rows.length === 0) {
        throw new Error("User doesn't exist");
      }

      sql = `SELECT FROM items WHERE id=$1`;
      const item_result = await connection.query(sql, [l.item_id]);
      if (item_result.rows.length === 0) {
        throw new Error("Item doesn't exist");
      }

      sql = `INSERT INTO likes (user_id, item_id)
            VALUES ($1, $2)
            RETURNING user_id, item_id`;
      const result = await connection.query(sql, [l.user_id, l.item_id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Error creating like: ${(error as Error).message}`);
    }
  }

  async getByUserID(id: string): Promise<Array<Item>> {
    let connection;
    try {
      connection = await db.connect();

      let sql = `SELECT FROM users WHERE id=$1`;
      const user_result = await connection.query(sql, [id]);
      if (user_result.rows.length === 0) {
        throw new Error("User doesn't exist");
      }

      sql = `SELECT * FROM items WHERE id IN (SELECT item_id FROM likes WHERE user_id=$1)`;
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows;
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `Error getting all likes from user id: ${(error as Error).message}`
      );
    }
  }

  async deleteById(l: Like): Promise<string> {
    let connection;
    try {
      connection = await db.connect();
      let sql = `SELECT FROM users WHERE id=$1`;
      const user_result = await connection.query(sql, [l.user_id]);
      if (user_result.rows.length === 0) {
        throw new Error("User doesn't exist");
      }

      sql = `SELECT FROM items WHERE id=$1`;
      const item_result = await connection.query(sql, [l.item_id]);
      if (item_result.rows.length === 0) {
        throw new Error("Item doesn't exist");
      }

      sql = `DELETE FROM likes WHERE user_id=$1 AND item_id=$2 RETURNING user_id`;
      const result = await connection.query(sql, [l.user_id, l.item_id]);
      if (result.rows.length === 0) {
        throw new Error("Match doesn't exist");
      }
      connection.release();

      return result.rows[0].user_id;
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Unable to delete like: ${(error as Error).message}`);
    }
  }
}

export default LikeModel;
