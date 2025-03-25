import User from "../types/user.type";
import Login from "../types/login.type";
import db from "../database/index";
import { gcon } from "../helpers/models.helper";
import bcrypt from "bcrypt";
import GoalModel from "./goal.model";
import Goal from "../types/goal.type";

class UserModel {
  // create user
  async create(u: User): Promise<User> {
    let connection;
    try {
      connection = await db.connect();
      const sqlExUser = `SELECT email FROM users WHERE email=$1`;
      const existingUser = await connection.query(sqlExUser, [u.email]);

      if (existingUser.rows.length > 0) {
        throw new Error("Email already exists!");
      }

      const hashedPassword = await bcrypt.hash(u.password, 10);
      const sql = `INSERT INTO users (username, email, password, first_name, last_name)
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING id, username, email, password, first_name, last_name`;

      const result = await connection.query(sql, [
        u.username,
        u.email,
        hashedPassword,
        u.first_name,
        u.last_name
      ]);

      await new GoalModel().create({
        user_id: result.rows[0].id,
        calories: 2500,
        protein: 1,
        fat: 1,
        carbs: 1
      } as Goal);
      connection.release();
      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `Unable to create (${u.username}): ${(error as Error).message}`
      );
    }
  }

  // read user by ID
  async getByID(id: string): Promise<User> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `SELECT id, username, email, password, first_name, last_name FROM users
      WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();

      if (result.rows.length == 0) {
        throw new Error("User doesn't exist");
      }
      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `User with id:${id} failed to be read: ${(error as Error).message}`
      );
    }
  }

  // update user
  async update(u: User, userId: string): Promise<User> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `UPDATE users 
      SET username=$1, email=$2, password=$3, first_name=$4, last_name=$5
      WHERE id=$6
      RETURNING id, username, email, password, first_name, last_name`;
      const result = await connection.query(sql, [
        u.username,
        u.email,
        u.password,
        u.first_name,
        u.last_name,
        userId
      ]);
      connection.release();

      if (result.rows.length == 0) {
        throw new Error("User doesn't exist");
      }
      return result.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `User with id:${u.id} failed to update: ${(error as Error).message}`
      );
    }
  }

  // delete user
  async deleteByID(id: string): Promise<string> {
    let connection;
    try {
      connection = await db.connect();
      const sql = `DELETE FROM users
      WHERE id=$1
      RETURNING id`;
      const result = await connection.query(sql, [id]);
      connection.release();

      if (result.rows.length == 0) {
        throw new Error("User doesn't exist");
      }

      return result.rows[0].id;
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(
        `User with id:${id} failed to delete: ${(error as Error).message}`
      );
    }
  }

  // auth user
  async login(u: Login): Promise<User> {
    let connection;
    if (!u.email || !u.password) {
      throw new Error("Missing Information! Unable to login.");
    }

    try {
      connection = await db.connect();
      const sqlExPassword = `SELECT id, username, email, password, first_name, last_name FROM users WHERE email=$1`;
      const existingUser = await connection.query(sqlExPassword, [u.email]);

      if (existingUser.rows.length === 0) {
        throw new Error("User doesn't exist");
      }

      const hashedPassword = u.password;
      const comp = await bcrypt.compare(
        hashedPassword,
        existingUser.rows[0].password
      );

      connection.release();
      if (!comp) {
        throw new Error("Incorrect Password");
      }

      return existingUser.rows[0];
    } catch (error) {
      if (typeof connection !== "undefined") {
        gcon(connection);
      }
      throw new Error(`Failed to Login: ${(error as Error).message}`);
    }
  }
}

export default UserModel;
