const request = require("supertest");
const sequelize = require("./util/database");
const app = require("./app");
const { describe } = require("node:test");
beforeAll(async () => {
  /**
   * Connecting Mysql once the test has been started.
   */
  await sequelize
    .sync()
    .then((result) => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err);
    });
});
describe("Get JobItem Test", () => {
  it("Get JobItem", async () => {
    let res = await request(app)
      .get("/api/v1/jobs")
      .expect("Content-Type", "application/json; charset=utf-8");
    expect(res.statusCode).toEqual(200);
  });
});
describe("Post And Delete JobItem Test", () => {
  let jobItemId;
  it("Post JobItem", async () => {
    let payload = {
      companyId: 3,
      position: "주니어 프론트 개발자",
      reward: 100000,
      detail: "welcome our service",
      technology: "node.js",
    };

    let res = await request(app).post("/api/v1/job").send(payload);
    expect(res.statusCode).toEqual(201);
    jobItemId = res.body.data.id;
  });

  it("Delete JobItem", async () => {
    let res = await request(app).delete(`/api/v1/job/${jobItemId}`);
    expect(res.statusCode).toEqual(200);
  });
});

afterAll(async () => {
  /**
   * Closing Mysql.
   */
  await sequelize.close();
});
