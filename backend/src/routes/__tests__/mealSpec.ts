import { MealType } from "../../types/meal.type";
import UserModel from "../../models/user.model";
import User from "../../types/user.type";
import db from "../../database/index";
import app from "../../index";
import supertest from "supertest";

const userModel = new UserModel();
const request = supertest(app);
const token = ``;

describe("Meal API Endpoints", () => {
  const day = new Date();
  const meal = {
    id: 0,
    user_id: 0,
    mtype: "Breakfast",
    meal_date: new Date(day.getFullYear(), day.getDay(), day.getDate())
  };

  const user = {
    username: "testname11",
    email: "test@polyeats1.c111om",
    password: "testing1word",
    first_name: "test1er",
    last_name: "testin1gton"
  } as User;

  beforeAll(async () => {
    const returnedUser = await userModel.create(user);
    meal.user_id = returnedUser.id as number;
  });

  afterAll(async () => {
    const connection = await db.connect();
    let sql = `DELETE FROM users`;
    await connection.query(sql);
    sql = `DELETE FROM meal`;
    await connection.query(sql);
    connection.release();
  });

  describe("Test CRUD API Methods", async () => {
    it("should create a new meal", async () => {
      const res = await request
        .post("/api/meals/")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(meal);

      const { id, user_id, mtype, meal_date } = res.body.data;

      expect(res.status).toBe(200);
      expect({
        user_id: user_id,
        mtype: mtype,
        meal_date: new Date(meal_date)
      }).toEqual({
        user_id: meal.user_id,
        mtype: meal.mtype,
        meal_date: meal.meal_date
      });
      meal.id = id;
    });

    it("Should fail to create due to invalid user_id", async () => {
      const invalidMeal = { ...meal, user_id: 9999 };
      const res = await request
        .post("/api/meals/")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(invalidMeal);

      expect(res.status).toBe(500);
    });

    it("Should read a meal by ID", async () => {
      const res = await request
        .get(`/api/meals/${meal.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual({
        ...meal,
        meal_date: meal.meal_date.toISOString()
      });
    });

    it("Should fail to read a meal by ID due to non-existent ID", async () => {
      const res = await request
        .get(`/api/meals/99999`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(500);
    });

    it("Should update a meal by ID", async () => {
      // For example, change the meal type and date
      const updatedMeal = {
        ...meal,
        mtype: "Dinner",
        meal_date: new Date(
          meal.meal_date.getFullYear(),
          meal.meal_date.getMonth(),
          meal.meal_date.getDate() + 1
        )
      };

      const res = await request
        .patch(`/api/meals/${meal.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(updatedMeal);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual({
        ...updatedMeal,
        id: meal.id,
        meal_date: updatedMeal.meal_date.toISOString()
      });

      meal.mtype = updatedMeal.mtype;
      meal.meal_date = updatedMeal.meal_date;
    });

    it("Should fail to update meal due to non-existent ID", async () => {
      const res = await request
        .patch(`/api/meals/99999`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...meal,
          mtype: MealType.Lunch
        });
      expect(res.status).toBe(500);
    });

    it("Should delete a meal by ID", async () => {
      const res = await request
        .delete(`/api/meals/${meal.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(meal.id);
    });

    it("Should fail to delete meal since ID isn't in base", async () => {
      const res = await request
        .delete(`/api/meals/99999`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(500);
    });
  });
});
