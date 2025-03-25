import Meal from "../../types/meal.type";
import UserModel from "../../models/user.model";
import User from "../../types/user.type";
import db from "../../database/index";
import app from "../../index";
import supertest from "supertest";
import LocationModel from "../../models/location.model";
import VenueModel from "../../models/venue.model";
import Venue from "../../types/venue.type";
import Location from "../../types/location.type";
import Item from "../../types/item.type";
import MealModel from "../../models/meal.model";
import ItemModel from "../../models/item.model";
import MealItem from "../../types/mealitem.type";

const venueModel = new VenueModel();
const locationModel = new LocationModel();
const userModel = new UserModel();
const mealModel = new MealModel();
const itemModel = new ItemModel();
const request = supertest(app);
const token = ``;

describe("MealItem API Endpoints", () => {
  const meal = {
    id: 0,
    user_id: 0,
    mtype: "Breakfast",
    meal_date: new Date(2025, 1, 17)
  } as Meal;

  const user = {
    username: "testname11",
    email: "test@polyeats1.c111om",
    password: "testing1word",
    first_name: "test1er",
    last_name: "testin1gton"
  } as User;

  let item = {
    location_id: 0,
    item_name: "FOOD",
    calories: 4,
    protein: 4,
    fat: 4,
    carbs: 4
  } as Item;

  const location = {
    name: "Hi",
    address: "233 CALPOLY ST BLVD IDK"
  } as Location;

  const venue = {
    name: "Sup",
    address: "same street idk"
  } as Venue;

  beforeAll(async () => {
    const returnedVenue = await venueModel.create(venue);
    location.venue_id = returnedVenue.id as unknown as number;
    const returnedLocation = await locationModel.create(location);
    item.location_id = returnedLocation.id as unknown as number;
    item = await itemModel.create(item);
    const returnedUser = await userModel.create(user);
    meal.user_id = returnedUser.id as number;
    const returnedMeal = await mealModel.create(meal);
    meal.id = returnedMeal.id;
  });

  afterAll(async () => {
    const connection = await db.connect();
    let sql = `DELETE FROM users`;
    await connection.query(sql);
    sql = `DELETE FROM meal`;
    await connection.query(sql);
    sql = `DELETE FROM venues`;
    await connection.query(sql);
    sql = `DELETE FROM location`;
    await connection.query(sql);
    sql = `DELETE FROM items`;
    connection.release();
  });

  describe("Test CRUD API Methods", async () => {
    it("should create new item and meal", async () => {
      const res = await request
        .post("/api/tracker/spec/add")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          day: "2025-02-17",
          item_id: item.id,
          user_id: meal.user_id
        });

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual({
        item_id: item.id,
        meal_id: meal.id
      });
    });
    it("should create a new mealItem", async () => {
      const res = await request
        .post("/api/tracker/")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          item_id: item.id,
          meal_id: meal.id
        } as MealItem);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual({
        item_id: item.id,
        meal_id: meal.id
      });
    });

    it("should not create a new mealItem", async () => {
      const res = await request
        .post("/api/tracker/")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          item_id: 0,
          meal_id: meal.id
        } as MealItem);

      expect(res.status).toBe(500);
    });

    it("should grab all mealItem items by meal id", async () => {
      const res = await request
        .get(`/api/tracker/${meal.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send();

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([item, item]);
    });

    it("should not grab all mealItem items by meal id", async () => {
      const res = await request
        .get(`/api/tracker/${999999}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send();

      expect(res.status).toBe(500);
    });

    it("should grab all mealItem items by user and date", async () => {
      const res = await request
        .get(`/api/tracker/spec/DaU/2025-02-17/${meal.user_id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send();

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([item, item]);
    });

    it("should delete a mealItem", async () => {
      const res = await request
        .delete("/api/tracker/delete")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          item_id: item.id,
          meal_id: meal.id
        } as MealItem);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(meal.id);
    });

    it("should not delete a new mealItem", async () => {
      const res = await request
        .delete("/api/tracker/delete")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          item_id: 0,
          meal_id: meal.id
        } as MealItem);

      expect(res.status).toBe(500);
    });
  });
});
