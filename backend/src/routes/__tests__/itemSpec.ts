import VenueModel from "../../models/venue.model";
import LocationModel from "../../models/location.model";
import Location from "../../types/location.type";
import Venue from "../../types/venue.type";
import Item from "../../types/item.type";
import app from "../../index";
import db from "../../database/index";
import supertest from "supertest";

const venueModel = new VenueModel();
const locationModel = new LocationModel();
const request = supertest(app);
const token = ``;

describe("Item API Endpoints", () => {
  const item = {
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
  });

  afterAll(async () => {
    const connection = await db.connect();
    let sql = `DELETE FROM venues`;
    await connection.query(sql);
    sql = `DELETE FROM location`;
    await connection.query(sql);
    sql = `DELETE FROM items`;
    connection.release();
  });

  describe("Test CRUD API Methods", () => {
    it("should create a new item", async () => {
      const res = await request
        .post("/api/items/")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(item);

      const { location_id, item_name, calories, protein, fat, carbs } =
        res.body.data;

      expect(res.status).toBe(200);
      expect({
        location_id: location_id,
        item_name: item_name,
        calories: calories,
        protein: protein,
        fat: fat,
        carbs: carbs
      }).toEqual({
        location_id: item.location_id,
        item_name: "FOOD",
        calories: 4,
        protein: 4,
        fat: 4,
        carbs: 4
      });
      item.id = res.body.data.id;
    });

    it("Should fail to create due to invalid location_id", async () => {
      const res = await request
        .post("/api/items/")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...item, location_id: 999 });

      expect(res.status).toBe(500);
    });

    it("Should read a item by ID", async () => {
      const res = await request
        .get(`/api/items/${item.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(item);
    });

    it("Should fail to read a item by ID due to not existing", async () => {
      const res = await request
        .get(`/api/items/99999`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(500);
    });

    it("Should update a item by ID", async () => {
      const res = await request
        .patch(`/api/items/${item.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...item,
          item_name: "BURGERRR"
        });
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual({
        ...item,
        item_name: "BURGERRR"
      });
    });

    it("Should fail to update item due to ID not existing", async () => {
      const res = await request
        .patch(`/api/items/99999`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...item,
          item_name: "BURGERUpdate"
        });
      expect(res.status).toBe(500);
    });

    it("Should delete a item by ID", async () => {
      const res = await request
        .delete(`/api/items/${item.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(item.id);
    });

    it("Should fail to delete item since ID isn't in base", async () => {
      const res = await request
        .delete(`/api/items/99999`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(500);
    });
  });
});
