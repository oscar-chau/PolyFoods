import Venue from "../types/venue.type";
import db from "../database/index";
import { gcon } from "../helpers/models.helper";

class VenueModel {
  async create(v: Venue): Promise<Venue> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `INSERT INTO venues (name, address)
            VALUES ($1, $2)
            RETURNING id, name, address`;
      const result = await connection.query(sql, [v.name, v.address]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Unable to create venue: ${(error as Error).message}`);
    }
  }

  async getByID(id: string): Promise<Venue> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `SELECT id, name, address
        FROM venues
        WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();

      if (result.rows.length == 0) {
        throw new Error("Id does not exist");
      }
      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Failed to retrieve venue: ${(error as Error).message}`);
    }
  }

  async update(v: Venue, id: string): Promise<Venue> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `UPDATE venues
        SET name=$1, address=$2
        WHERE id=$3
        RETURNING id, name, address`;
      const result = await connection.query(sql, [v.name, v.address, id]);
      connection.release();

      if (result.rows.length == 0) {
        throw new Error(`Venue with id:${id} does not exist`);
      }

      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Failed to update venue: ${(error as Error).message}`);
    }
  }

  async deleteByID(id: string): Promise<string> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `DELETE FROM venues
        WHERE id=$1
        RETURNING id`;
      const result = await connection.query(sql, [id]);
      connection.release();
      if (result.rows.length == 0) {
        throw new Error("Venue does not exist");
      }
      return result.rows[0].id;
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Failed to delete Venue ${(error as Error).message}`);
    }
  }

  async getVenueByName(name: string): Promise<Venue> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `SELECT id FROM venues WHERE name=$1`;
      const result = await connection.query(sql, [name]);
      connection.release();

      if (result.rows.length === 0) {
        throw new Error("Venue does not exist");
      }

      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Failed to retrieve Venue: ${(error as Error).message}`);
    }
  }
}

export default VenueModel;
