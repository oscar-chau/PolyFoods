import MealModel from "../meal.model";
import Meal from "../../types/meal.type";
import { MealType } from "../../types/meal.type";
import db from "../../database/index";
import UserModel from "../user.model";
import User from "../../types/user.type";

const mealModel = new MealModel();
const userModel = new UserModel();

describe("Meal Model", () => {
  describe("Test Methods Exist", () => {
    it("Should have create user method", () => {
      expect(mealModel.create).toBeDefined();
    });

    it("Should have read by ID method", () => {
      expect(mealModel.getByID).toBeDefined();
    });

    it("Should have update user method", () => {
      expect(mealModel.update).toBeDefined();
    });

    it("Should have delete user method", () => {
      expect(mealModel.deleteByID).toBeDefined();
    });
  });

  describe("Test MealModel Logic", () => {
    const day = new Date();
    const meal = {
      id: 0,
      user_id: 0,
      mtype: MealType.Breakfast,
      meal_date: new Date(day.getFullYear(), day.getDay(), day.getDate())
    } as Meal;

    const user = {
      username: "testname11",
      email: "test@polyeats1.c111om",
      password: "testing1word",
      first_name: "test1er",
      last_name: "testin1gton"
    } as User;

    beforeAll(async () => {
      const createdUser = await userModel.create(user);
      meal.user_id = createdUser.id as unknown as number;
    });

    afterAll(async () => {
      const connection = await db.connect();
      let sql = `DELETE FROM meal`;
      await connection.query(sql);
      sql = `DELETE FROM users`;
      await connection.query(sql);
      connection.release();
    });

    it("Create method should return a new meal", async () => {
      const returnedMeal = await mealModel.create(meal);
      meal.id = returnedMeal.id;
      expect(returnedMeal).toEqual(meal);
    });

    it("Read method should retrieve element by id", async () => {
      const returnedMeal = await mealModel.getByID(
        meal.id as unknown as string
      );
      expect(returnedMeal).toEqual(meal);
    });

    it("Update method should update a meal", async () => {
      const returnedMeal = await mealModel.update(
        {
          ...meal,
          mtype: MealType.Lunch,
          meal_date: new Date(2025, 1, 1)
        } as Meal,
        meal.id as unknown as string
      );

      expect(returnedMeal).toEqual({
        ...meal,
        mtype: MealType.Lunch,
        meal_date: new Date(2025, 1, 1)
      } as Meal);
    });

    it("Delete method should delete a meal", async () => {
      const returnedId = await mealModel.deleteByID(
        meal.id as unknown as string
      );
      expect(returnedId).toEqual(meal.id as unknown as string);
    });
  });
});
