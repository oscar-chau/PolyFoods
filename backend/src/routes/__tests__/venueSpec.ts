import supertest from "supertest";
import Venue from "../../types/venue.type";
import app from "../../index";
import db from "../../database/index";

const request = supertest(app);
const token = ``;

describe("Venue API Endpoints", () => {
  const venue = {
    name: "Test Venue",
    address: "123 Test Street"
  } as Venue;

  afterAll(async () => {
    const connection = await db.connect();
    await connection.query("DELETE FROM venues");
    connection.release();
  });

  describe("Test CRUD API Methods", () => {
    it("should create a new venue", async () => {
      const res = await request
        .post("/api/venues/")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(venue);

      const { name, address } = res.body.data;

      expect(res.status).toBe(200);
      expect({ name, address }).toEqual({
        name: venue.name,
        address: venue.address
      });

      venue.id = res.body.data.id;
    });

    it("should fail to create a venue with duplicate name and address", async () => {
      const res = await request
        .post("/api/venues/")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(venue);

      expect(res.status).toBe(500);
    });

    it("should read a venue by ID", async () => {
      const res = await request
        .get(`/api/venues/${venue.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(venue);
    });

    it("should fail to read a venue by ID due to non-existence", async () => {
      const res = await request
        .get(`/api/venues/99999`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(500);
    });

    it("should update a venue by ID", async () => {
      const updatedVenue = {
        ...venue,
        name: "Updated Test Venue",
        address: "456 Updated Street"
      };

      const res = await request
        .patch(`/api/venues/${venue.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(updatedVenue);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual({
        id: venue.id,
        name: updatedVenue.name,
        address: updatedVenue.address
      });
    });

    it("should fail to update a venue by non-existent ID", async () => {
      const res = await request
        .patch(`/api/venues/99999`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Non-existent Venue",
          address: "No Address"
        });

      expect(res.status).toBe(500);
    });

    it("should delete a venue by ID", async () => {
      const res = await request
        .delete(`/api/venues/${venue.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(venue.id);
    });

    it("should fail to delete a venue by non-existent ID", async () => {
      const res = await request
        .delete(`/api/venues/99999`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(500);
    });
  });
});
