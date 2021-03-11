import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";

import createConnection from "../database";

describe("Tools", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new tool", async () => {
    const response = await request(app).post("/tools").send({
      title: "tool-test",
      link: "https://tool-test.com",
      description:
        "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.",
      tags: ["test", "dsa", "das"],
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
