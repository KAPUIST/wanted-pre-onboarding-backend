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

describe("CRUD JobItem Test", () => {
  let jobItemId;

  it("Create JobItem", async () => {
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
  it("Get JobItem", async () => {
    let res = await request(app)
      .get("/api/v1/jobs")
      .expect("Content-Type", "application/json; charset=utf-8");
    expect(res.statusCode).toEqual(200);
  });
  it("Update JobItem", async () => {
    let payload = {
      jobItemId,
      position: "시니어 개발자",
      reward: 50000,
      detail: "For Test Unit",
      technology: "Spring",
    };
    let res = await request(app).put("/api/v1/job").send(payload);
    expect(res.statusCode).toEqual(200);
  });

  it("Delete JobItem", async () => {
    let res = await request(app).delete(`/api/v1/job/${jobItemId}`);
    expect(res.statusCode).toEqual(200);
  });
});
describe("Get Job Item Detail", () => {
  it("Get Detail Job", async () => {
    let res = await request(app).get(`/api/v1/job/6`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.anotherJobs).toHaveLength(1);
  });
});
describe("Apply Job", () => {
  let applyJobId;
  const payload = {
    jobItemId: 2,
    userId: 2,
  };
  it("Apply Job", async () => {
    let res = await request(app).post("/api/v1/applyJob").send(payload);
    expect(res.statusCode).toEqual(201);

    applyJobId = res.body.data.id;
  });
  it("Duplicated Apply Job", async () => {
    let res = await request(app).post("/api/v1/applyJob").send(payload);
    expect(res.statusCode).toEqual(400);
  });

  it("Delete Apply Job", async () => {
    let res = await request(app).delete(`/api/v1/applyJob/${applyJobId}`);
    expect(res.statusCode).toEqual(200);
  });
});

afterAll(async () => {
  /**
   * Closing Mysql.
   */
  await sequelize.close().then(() => {
    console.log("Connection Closed");
  });
});
