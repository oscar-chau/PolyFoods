import UserModel from "../user.model";
import User from "../../types/user.type";
import db from "../../database/index";

const userModel = new UserModel();

describe("User Model", () => {
  describe("Test Methods Exist", () => {
    it("Should have create user method", () => {
      expect(userModel.create).toBeDefined();
    });

    it("Should have read by ID method", () => {
      expect(userModel.getByID).toBeDefined();
    });

    it("Should have update user method", () => {
      expect(userModel.update).toBeDefined();
    });

    it("Should have delete user method", () => {
      expect(userModel.deleteByID).toBeDefined();
    });
  });

  describe("Test UserModel Logic", () => {
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

    it("Update method should update a user", async () => {
      const returnedUser = await userModel.update(
        {
          ...user,
          username: "YO NEW NAME",
          password: "NEW PASSWORD TOO",
          last_name: "AND A NEW LAST NAME"
        },
        user.id as unknown as string
      );
      expect(returnedUser).toEqual({
        ...user,
        username: "YO NEW NAME",
        password: "NEW PASSWORD TOO",
        last_name: "AND A NEW LAST NAME"
      });
    });

    it("Delete method should return the id of the deleted user", async () => {
      const returnedId = await userModel.deleteByID(
        user.id as unknown as string
      );
      expect(returnedId).toEqual(user.id as unknown as string);
    });
  });
});
