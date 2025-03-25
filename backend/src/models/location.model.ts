import Location from "../types/location.type";
import db from "../database/index";
import { gcon } from "../helpers/models.helper";

class LocationModel {
  async create(l: Location): Promise<Location> {
    let connection;
    try {
      connection = await db.connect();
      const sql2 = `SELECT id FROM venues WHERE id=$1`;
      const result2 = await connection.query(sql2, [l.venue_id]);

      if (result2.rows.length == 0) {
        throw new Error("Venue doesn't exist");
      }

      const sql = `INSERT INTO location (venue_id, name, address)
            VALUES ($1, $2, $3)
            RETURNING id, venue_id, name, address`;
      const result = await connection.query(sql, [
        l.venue_id,
        l.name,
        l.address
      ]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Error creating location: ${(error as Error).message}`);
    }
  }

  async getByID(id: string): Promise<Location> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `SELECT id, venue_id, name, address
            FROM location
            WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();

      if (result.rows.length == 0) {
        throw new Error("Location doesn't exist");
      }

      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `Failed to retrieve Location: ${(error as Error).message}`
      );
    }
  }

  async update(l: Location, id: string): Promise<Location> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `UPDATE location
        SET name=$1, address=$2
        WHERE id=$3
        RETURNING id, venue_id, name, address`;
      const result = await connection.query(sql, [l.name, l.address, id]);
      connection.release();

      if (result.rows.length == 0) {
        throw new Error("Location doesn't exist");
      }

      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Unable to update Location: ${(error as Error).message}`);
    }
  }

  async deleteByID(id: string): Promise<string> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `DELETE FROM location
        WHERE id=$1
        RETURNING id`;
      const result = await connection.query(sql, [id]);
      connection.release();
      if (result.rows.length == 0) {
        throw new Error("Location doesn't exist");
      }

      return result.rows[0].id;
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `Unable to delete location: ${(error as Error).message} `
      );
    }
  }

  async getAllByVenue(id: string): Promise<Array<Location>> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `SELECT * FROM location WHERE venue_id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows;
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `Unable to collect all locations from venue: ${(error as Error).message}`
      );
    }
  }

  async getByLocationName(name: string): Promise<Location> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `SELECT * FROM location WHERE name=$1`;
      const result = await connection.query(sql, [name]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `Unable to collect location from name: ${(error as Error).message}`
      );
    }
  }
}

export default LocationModel;
