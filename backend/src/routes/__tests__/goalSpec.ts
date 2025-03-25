import supertest from "supertest";
import Goal from "../../types/goal.type";
import app from "../../index";
import db from "../../database/index";
import User from "../../types/user.type";
import UserModel from "../../models/user.model";
import GoalModel from "../../models/goal.model";

const userModel = new UserModel();
const goalModel = new GoalModel();
const request = supertest(app);
const token = ``;

describe("Goal API Endpoints", () => {
  const user = {
    username: "testname11",
    email: "test@polyeats1.c111om",
    password: "testing1word",
    first_name: "test1er",
    last_name: "testin1gton"
  } as User;

  let goal = {
    user_id: 0,
    calories: 100,
    protein: 100,
    fat: 100,
    carbs: 100
  } as Goal;

  beforeAll(async () => {
    const returnedUser = await userModel.create(user);
    goal = await goalModel.getGoalByUserID(
      returnedUser.id as unknown as string
    );
  });

  afterAll(async () => {
    const connection = await db.connect();
    let sql = `DELETE FROM goals`;
    await connection.query(sql);
    sql = `DELETE FROM users`;
    await connection.query(sql);

    connection.release();
  });

  describe("Test CRUD API Methods", () => {
    it("Should read a goal by ID", async () => {
      const res = await request
        .get(`/api/goals/${goal.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(goal);
    });

    it("Should fail to read a goal by ID due to not existing", async () => {
      const res = await request
        .get(`/api/goals/${312312}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(500);
    });

    it("Should update goal by ID", async () => {
      const res = await request
        .patch(`/api/goals/${goal.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...goal,
          calories: 1312,
          fat: 123123
        });
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual({
        ...goal,
        calories: 1312,
        fat: 123123
      });
    });

    it("Should fail to update goal due to ID not existing", async () => {
      const res = await request
        .patch(`/api/goals/${520321}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...goal,
          calories: 1312,
          fat: 123123
        });
      expect(res.status).toBe(500);
    });

    it("Should delete goal by ID", async () => {
      const res = await request
        .delete(`/api/goals/${goal.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(goal.id);
    });

    it("Should fail to delete Goal since ID isn't in base", async () => {
      const res = await request
        .delete(`/api/goals/${313121}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(500);
      expect(res.body.data).not.toEqual(goal.id);
    });
  });
});
