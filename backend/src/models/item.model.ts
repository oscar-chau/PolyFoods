import Item from "../types/item.type";
import db from "../database/index";
import { gcon } from "../helpers/models.helper";

class ItemModel {
  async create(i: Item): Promise<Item> {
    let connection;
    try {
      connection = await db.connect();
      let sql = `SELECT id from location WHERE id=$1`;
      const result = await connection.query(sql, [i.location_id]);

      if (result.rows.length == 0) {
        throw new Error("Location doesn't exist");
      }

      sql = `INSERT INTO items
            (location_id, item_name, calories, protein, fat, carbs)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, location_id, item_name, calories, protein, fat, carbs`;
      const result2 = await connection.query(sql, [
        i.location_id,
        i.item_name,
        i.calories,
        i.protein,
        i.fat,
        i.carbs
      ]);
      connection.release();

      return result2.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Error creating item: ${(error as Error).message}`);
    }
  }

  async getByID(id: string): Promise<Item> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `SELECT id, location_id, item_name, calories, protein, fat, carbs
        FROM items
        WHERE id=$1;`;
      const result = await connection.query(sql, [id]);
      connection.release();

      if (result.rows.length == 0) {
        throw new Error("Item doesn't exist");
      }

      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Failed to retrieve Item: ${(error as Error).message}`);
    }
  }

  async update(i: Item, id: string): Promise<Item> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `UPDATE items
      SET item_name=$1, calories=$2, protein=$3, fat=$4, carbs=$5
      WHERE id=$6
      RETURNING id, location_id, item_name, calories, protein, fat, carbs`;
      const result = await connection.query(sql, [
        i.item_name,
        i.calories,
        i.protein,
        i.fat,
        i.carbs,
        id
      ]);
      connection.release();

      if (result.rows.length == 0) {
        throw new Error("Item doesn't exist");
      }

      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Unable to update Item: ${(error as Error).message}`);
    }
  }

  async deleteByID(id: string): Promise<string> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `DELETE FROM items
        WHERE id=$1
        RETURNING id`;
      const result = await connection.query(sql, [id]);
      connection.release();
      if (result.rows.length == 0) {
        throw new Error("Item doesn't exist");
      }

      return result.rows[0].id;
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Unable to delete Item: ${(error as Error).message}`);
    }
  }

  async getAllByLocation(id: string): Promise<Array<Item>> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `SELECT id, location_id, item_name, calories, protein, fat, carbs
      FROM items
      WHERE location_id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows;
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Unable to delete Item: ${(error as Error).message}`);
    }
  }
}

export default ItemModel;
