import VenueModel from "../models/venue.model";
import Venue from "../types/venue.type";

// current venues
const mp1901 = {
  name: "1901 Marketplace",
  address: "Cal Poly, not yet added"
} as Venue;

const vg = {
  name: "Vista Grande",
  address: "Cal Poly, not yet added"
} as Venue;

const pcv = {
  name: "Poly Canyon Village",
  address: "Cal Poly, not yet added"
} as Venue;

const venueModel = new VenueModel();

const createAll = async () => {
  await venueModel.create(mp1901);
  await venueModel.create(vg);
  await venueModel.create(pcv);

  process.exit();
};

createAll();

// run python script after this
