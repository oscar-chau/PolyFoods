import ItemModel from "../item.model";
import Item from "../../types/item.type";
import LocationModel from "../location.model";
import Location from "../../types/location.type";
import VenueModel from "../venue.model";
import Venue from "../../types/venue.type";
import db from "../../database/index";

const itemModel = new ItemModel();
const locationModel = new LocationModel();
const venueModel = new VenueModel();

describe("Item Model", () => {
  describe("Test Methods Exist", () => {
    it("Should have create user method", () => {
      expect(itemModel.create).toBeDefined();
    });

    it("Should have read by ID method", () => {
      expect(itemModel.getByID).toBeDefined();
    });

    it("Should have update user method", () => {
      expect(itemModel.update).toBeDefined();
    });

    it("Should have delete user method", () => {
      expect(itemModel.deleteByID).toBeDefined();
    });
  });

  describe("Test ItemModel Logic", () => {
    let returnedLocation: Location;

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
      const createdVenue = await venueModel.create(venue);
      location.venue_id = createdVenue.id as number;
      returnedLocation = await locationModel.create(location);
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

    it("Create method should return a new Item", async () => {
      const returnedItem = await itemModel.create(item);
      item.id = returnedItem.id;
      expect(returnedItem).toEqual(item);
    });

    it("getByID method should retrieve a location by ID", async () => {
      const returnedItem = await itemModel.getByID(
        item.id as unknown as string
      );
      expect(returnedItem).toEqual(item);
    });

    it("Should get all items from location id", async () => {
      const returnedItems = await itemModel.getAllByLocation(
        returnedLocation.id as unknown as string
      );
      expect(returnedItems.length).toEqual(1);
      expect(returnedItems[0]).toEqual(item);
    });
  });
});
