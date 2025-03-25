import VenueModel from "../../models/venue.model";
import Location from "../../types/location.type";
import app from "../../index";
import db from "../../database/index";
import supertest from "supertest";

const venueModel = new VenueModel();
const request = supertest(app);
const token = ``;

describe("Location API Endpoints", () => {
  const location = {
    name: "Test Location",
    address: "123 Test Street"
  } as Location;

  beforeAll(async () => {
    const returnedVenue = await venueModel.create({
      name: "TESTVEN",
      address: "TESTADDY"
    });
    location.venue_id = returnedVenue.id as number;
  });

  afterAll(async () => {
    const connection = await db.connect();
    let sql = `DELETE FROM location`;
    await connection.query(sql);
    sql = `DELETE FROM venues`;
    await connection.query(sql);
    connection.release();
  });

  describe("Test CRUD API Methods", () => {
    it("should create a new location", async () => {
      const res = await request
        .post("/api/locations/")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(location);

      const { venue_id, name, address } = res.body.data;

      expect(res.status).toBe(200);
      expect({
        venue_id: venue_id,
        name: name,
        address: address
      }).toEqual({
        venue_id: location.venue_id,
        name: "Test Location",
        address: "123 Test Street"
      });
      location.id = res.body.data.id;
    });

    it("Should fail to create due to invalid venue_id", async () => {
      const res = await request
        .post("/api/locations/")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...location, venue_id: 999 });

      expect(res.status).toBe(500);
    });

    it("Should read a location by ID", async () => {
      const res = await request
        .get(`/api/locations/${location.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(location);
    });

    it("Should fail to read a location by ID due to not existing", async () => {
      const res = await request
        .get(`/api/locations/99999`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(500);
    });

    it("Should update a location by ID", async () => {
      const res = await request
        .patch(`/api/locations/${location.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...location,
          name: "Updated Location Name",
          address: "456 Updated Address"
        });
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual({
        ...location,
        name: "Updated Location Name",
        address: "456 Updated Address"
      });
    });

    it("Should fail to update location due to ID not existing", async () => {
      const res = await request
        .patch(`/api/locations/99999`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...location,
          name: "Another Update",
          address: "789 Another Address"
        });
      expect(res.status).toBe(500);
    });

    it("Should delete a location by ID", async () => {
      const res = await request
        .delete(`/api/locations/${location.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(location.id);
    });

    it("Should fail to delete location since ID isn't in base", async () => {
      const res = await request
        .delete(`/api/locations/99999`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(500);
    });
  });
});
