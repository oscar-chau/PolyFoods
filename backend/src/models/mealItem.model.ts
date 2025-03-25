import MealItem from "../types/mealitem.type";
import db from "../database/index";
import { gcon } from "../helpers/models.helper";
import Item from "../types/item.type";
import MealModel from "./meal.model";
import Meal from "../types/meal.type";
import dayjs from "dayjs";

class MealItemModel {
  async create(i: MealItem): Promise<MealItem> {
    let connection;
    let result;
    try {
      connection = await db.connect();
      let sql = `SELECT id from items WHERE id=$1`;
      result = await connection.query(sql, [i.item_id]);

      if (result.rows.length === 0) {
        throw new Error("Item does not exist");
      }

      sql = `SELECT id from meal WHERE id=$1`;
      result = await connection.query(sql, [i.meal_id]);

      if (result.rows.length === 0) {
        throw new Error("Meal does not exist");
      }

      sql = `INSERT INTO meal_item 
            (item_id, meal_id)
            VALUES ($1, $2)
            RETURNING item_id, meal_id`;

      result = await connection.query(sql, [i.item_id, i.meal_id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Error created MealItem: ${(error as Error).message}`);
    }
  }

  async deleteByID(i: MealItem): Promise<string> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `DELETE FROM meal_item
WHERE ctid IN (
  SELECT ctid
  FROM meal_item
  WHERE item_id = $1 AND meal_id = $2
  LIMIT 1
)
RETURNING meal_id;`;
      const result = await connection.query(sql, [i.item_id, i.meal_id]);
      connection.release();
      if (result.rows.length == 0) {
        throw new Error("Match doesn't exist");
      }

      return result.rows[0].meal_id;
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Unable to delete MealItem: ${(error as Error).message}`);
    }
  }

  async getItemsByMealID(id: string): Promise<Array<Item>> {
    let connection;
    let result;
    let sql;
    try {
      connection = await db.connect();
      sql = `SELECT id FROM meal WHERE id=$1`;
      result = await connection.query(sql, [id]);

      if (result.rows.length === 0) {
        throw new Error("Meal does not exist");
      }

      sql = `SELECT mt.*
            FROM items mt
            JOIN meal_item jt ON mt.id = jt.item_id
            WHERE jt.meal_id = $1`;

      result = await connection.query(sql, [id]);
      connection.release();

      return result.rows;
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Failed to retrieve items: ${(error as Error).message}`);
    }
  }

  async addFoodToDate(
    day: string,
    food_id: string,
    user_id: string
  ): Promise<MealItem> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `SELECT id FROM meal WHERE meal_date=$1 AND user_id=$2`;
      const result = await connection.query(sql, [
        dayjs(day).startOf("day").toDate(),
        user_id
      ]);
      let meal_id;
      connection.release();

      if (result.rows.length === 0) {
        const mealModel = new MealModel();
        const returnedMeal = await mealModel.create({
          user_id: user_id,
          meal_date: day
        } as unknown as Meal);
        meal_id = returnedMeal.id;
      } else {
        meal_id = result.rows[0].id;
      }

      return await this.create({
        item_id: food_id,
        meal_id: meal_id
      } as unknown as MealItem);
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `Failed to add item to meal: ${(error as Error).message}`
      );
    }
  }

  async deleteFoodfromDate(
    day: string,
    food_id: string,
    user_id: string
  ): Promise<string> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `SELECT id FROM meal WHERE meal_date=$1 AND user_id=$2`;
      const result = await connection.query(sql, [
        dayjs(day).startOf("day").toDate(),
        user_id
      ]);
      connection.release();

      if (result.rows.length === 0) {
        throw new Error("Meal does not exist");
      }

      const meal_id = result.rows[0].id;

      await this.deleteByID({
        item_id: food_id,
        meal_id: meal_id
      } as unknown as MealItem);

      return meal_id as unknown as string;
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `Failed to add item to meal: ${(error as Error).message}`
      );
    }
  }

  async getFoodsFromDateAndUser(
    day: string,
    user_id: string
  ): Promise<Array<Item>> {
    let connection;
    try {
      connection = await db.connect();

      const sql = `SELECT id FROM meal WHERE meal_date=$1 AND user_id=$2`;
      const result = await connection.query(sql, [
        dayjs(day).startOf("day").toDate(),
        user_id
      ]);
      connection.release();

      if (result.rows.length === 0) {
        throw new Error("Match does not exist");
      }

      return await this.getItemsByMealID(result.rows[0].id);
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `Failed to get items from meal: ${(error as Error).message}`
      );
    }
  }
}

export default MealItemModel;
