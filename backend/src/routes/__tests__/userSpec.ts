import supertest from "supertest";
import UserModel from "../../models/user.model";
import User from "../../types/user.type";
import app from "../../index";
import db from "../../database/index";

const userModel = new UserModel();
const request = supertest(app);
const token = "";

describe("User API Endpoints", () => {
  const user = {
    username: "testname1",
    email: "test@polyeats1.com",
    password: "testingword",
    first_name: "tester",
    last_name: "testington"
  } as User;

  beforeAll(async () => {
    const createdUser = await userModel.create(user);
    user.id = createdUser.id;
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql = `DELETE FROM users`;
    await connection.query(sql);
    connection.release();
  });

  describe("Test CRUD API Methods", () => {
    it("Should fail to create a new User due to duplicate emails", async () => {
      const res = await request
        .post("/api/users/")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(user);
      expect(res.status).toBe(500);
    });

    it("Should update user by ID", async () => {
      const res = await request
        .patch(`/api/users/${user.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...user,
          username: "YO NEW NAME",
          password: "NEW PASSWORD TOO",
          last_name: "AND A NEW LAST NAME"
        });
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual({
        ...user,
        username: "YO NEW NAME",
        password: "NEW PASSWORD TOO",
        last_name: "AND A NEW LAST NAME"
      });
    });

    it("Should fail to update user due to ID not existing", async () => {
      const res = await request
        .patch(`/api/users/${520321}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...user,
          username: "YO NEW NAME",
          password: "NEW PASSWORD TOO",
          last_name: "AND A NEW LAST NAME"
        });
      expect(res.status).toBe(500);
    });

    it("Should delete user by ID", async () => {
      const res = await request
        .delete(`/api/users/${user.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(user.id);
    });

    it("Should fail to delete User since ID isn't in base", async () => {
      const res = await request
        .delete(`/api/users/${313121}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(500);
      expect(res.body.data).not.toEqual(user.id);
    });
  });
});
