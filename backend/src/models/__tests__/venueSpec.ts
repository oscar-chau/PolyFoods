import VenueModel from "../venue.model";
import Venue from "../../types/venue.type";
import db from "../../database/index";

const venueModel = new VenueModel();

describe("Venue Model", () => {
  describe("Test Methods Exist", () => {
    it("Should have create venue method", () => {
      expect(venueModel.create).toBeDefined();
    });

    it("Should have read by ID method", () => {
      expect(venueModel.getByID).toBeDefined();
    });

    it("Should have update venue method", () => {
      expect(venueModel.update).toBeDefined();
    });

    it("Should have delete venue method", () => {
      expect(venueModel.deleteByID).toBeDefined();
    });
  });

  describe("Test VenueModel Logic", () => {
    const venue = {
      name: "Venue A",
      address: "1234 Street, City, Country"
    } as Venue;

    beforeAll(async () => {
      const createdVenue = await venueModel.create(venue);
      venue.id = createdVenue.id;
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql = `DELETE FROM venues`;
      await connection.query(sql);
      connection.release();
    });

    it("Create method should return a new Venue", async () => {
      const returnedVenue = await venueModel.create({
        name: "Venue B",
        address: "5678 Avenue, Town, State"
      } as Venue);
      expect(returnedVenue).toEqual({
        id: returnedVenue.id,
        name: "Venue B",
        address: "5678 Avenue, Town, State"
      } as Venue);
    });

    it("Read method should retrieve venue by ID", async () => {
      const returnedVenue = await venueModel.getByID(
        venue.id as unknown as string
      );
      expect(returnedVenue).toEqual(venue);
    });

    it("Update method should update a venue", async () => {
      const updatedVenue = await venueModel.update(
        {
          ...venue,
          name: "Updated Venue A",
          address: "Updated Address 1234, City"
        },
        venue.id as unknown as string
      );
      expect(updatedVenue).toEqual({
        ...venue,
        name: "Updated Venue A",
        address: "Updated Address 1234, City"
      });
    });

    it("Delete method should return the id of the deleted venue", async () => {
      const returnedId = await venueModel.deleteByID(
        venue.id as unknown as string
      );
      expect(returnedId).toEqual(venue.id as unknown as string);
    });
  });
});
