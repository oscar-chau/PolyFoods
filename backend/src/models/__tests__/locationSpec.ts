import LocationModel from "../location.model";
import Location from "../../types/location.type";
import VenueModel from "../venue.model";
import db from "../../database/index";
import Venue from "../../types/venue.type";

const locationModel = new LocationModel();
const venueModel = new VenueModel();

describe("Location Model", () => {
  describe("Test Methods Exist", () => {
    it("Should have create user method", () => {
      expect(locationModel.create).toBeDefined();
    });

    it("Should have read by ID method", () => {
      expect(locationModel.getByID).toBeDefined();
    });

    it("Should have update user method", () => {
      expect(locationModel.update).toBeDefined();
    });

    it("Should have delete user method", () => {
      expect(locationModel.deleteByID).toBeDefined();
    });
  });

  describe("Test LocationModel Logic", () => {
    let location = {
      name: "Hi",
      address: "233 CALPOLY ST BLVD IDK"
    } as Location;

    const venue = {
      name: "Sup",
      address: "same street idk"
    } as Venue;

    beforeAll(async () => {
      const createdVenue = await venueModel.create(venue);
      location.venue_id = createdVenue.id as number;
    });

    afterAll(async () => {
      const connection = await db.connect();
      let sql = `DELETE FROM venues`;
      await connection.query(sql);
      sql = `DELETE FROM location`;
      await connection.query(sql);
      connection.release();
    });

    it("Create method should return a new Location", async () => {
      const returnedLocation = await locationModel.create({
        venue_id: location.venue_id,
        name: "DIFFERENT NAME",
        address: "SAME STREET IDK"
      } as Location);
      expect(returnedLocation).toEqual({
        id: returnedLocation.id,
        venue_id: location.venue_id,
        name: "DIFFERENT NAME",
        address: "SAME STREET IDK"
      } as Location);
      location = returnedLocation;
    });

    it("getByID method should retrieve a location by ID", async () => {
      const returnedLocation = await locationModel.getByID(
        location.id as unknown as string
      );
      expect(returnedLocation).toEqual(location);
    });
    it("Update method should update a location", async () => {
      const updatedLocation = await locationModel.update(
        {
          ...location,
          name: "Updated Location Name",
          address: "789 Updated Address"
        },
        location.id as unknown as string
      );
      expect(updatedLocation).toEqual({
        ...location,
        name: "Updated Location Name",
        address: "789 Updated Address"
      });
    });
    it("Delete method should delete a location and return the ID", async () => {
      const deletedID = await locationModel.deleteByID(
        location.id as unknown as string
      );
      expect(deletedID).toEqual(location.id as unknown as string);
    });
  });
});
