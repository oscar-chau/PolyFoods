import supertest from "supertest";
import app from "../../index";
import UserModel from "../../models/user.model";
import VenueModel from "../../models/venue.model";
import LocationModel from "../../models/location.model";
import ItemModel from "../../models/item.model";
import db from "../../database/index";
import User from "../../types/user.type";
import Venue from "../../types/venue.type";
import Location from "../../types/location.type";
import Item from "../../types/item.type";
import Like from "../../types/like.type";

const request = supertest(app);
const token = ``; // Provide a valid token if authentication is required

describe("Like API Endpoints", () => {
  // Instantiate model objects
  const userModel = new UserModel();
  const venueModel = new VenueModel();
  const locationModel = new LocationModel();
  const itemModel = new ItemModel();

  // Test objects
  let user = {
    username: "testuser1",
    email: "test1@example.com",
    password: "password123",
    first_name: "Test",
    last_name: "User"
  } as User;

  const venue = {
    name: "Test Venue",
    address: "123 Test Ave"
  } as Venue;

  const location = {
    name: "Test Location",
    address: "456 Location Rd"
  } as Location;

  let item = {
    location_id: 0,
    item_name: "Test Food",
    calories: 100,
    protein: 10,
    fat: 5,
    carbs: 15
  } as Item;

  const like = {
    user_id: 0,
    item_id: 0
  } as Like;

  beforeAll(async () => {
    // Create venue, location, item, and user
    const returnedVenue = await venueModel.create(venue);
    location.venue_id = returnedVenue.id as number;

    const returnedLocation = await locationModel.create(location);
    item.location_id = returnedLocation.id as number;

    const returnedItem = await itemModel.create(item);
    item = returnedItem;

    const returnedUser = await userModel.create(user);
    user = returnedUser;

    // Set like test data
    like.user_id = user.id as number;
    like.item_id = item.id as number;
  });

  afterAll(async () => {
    const connection = await db.connect();
    try {
      // Clean up test data in proper order due to foreign key constraints
      await connection.query("DELETE FROM likes");
      await connection.query("DELETE FROM users");
      await connection.query("DELETE FROM items");
      await connection.query("DELETE FROM location");
      await connection.query("DELETE FROM venues");
    } catch (err) {
      console.error("Error cleaning up test data:", err);
    } finally {
      connection.release();
    }
  });

  describe("Test CRUD API Methods", () => {
    it("should create a new like", async () => {
      const res = await request
        .post("/api/likes")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(like);

      expect(res.status).toBe(200);
      // Expect the returned data to include the user_id and item_id for the created like
      expect(res.body.data).toEqual({
        user_id: like.user_id,
        item_id: like.item_id
      });
    });

    it("should not create a new like with an invalid user", async () => {
      const res = await request
        .post("/api/likes")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id: 0, // invalid user
          item_id: like.item_id
        } as Like);

      expect(res.status).toBe(500);
    });

    it("should get all likes for a given user", async () => {
      const res = await request
        .get(`/api/likes/${user.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([item]);
    });

    it("should delete a like using delete", async () => {
      const res = await request
        .delete(`/api/likes/${like.user_id}/${like.item_id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(like.user_id);
    });

    it("should not delete a like that does not exist", async () => {
      const res = await request
        .delete(`/api/likes/${like.user_id}/0`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(500);
    });
  });
});
