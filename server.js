const app = require("./app");
const dotenv = require("dotenv");
const sequelize = require("./util/database");
dotenv.config();
const PORT = process.env.SERVER_PORT || 8080;
sequelize
  .sync({ force: false })
  .then((result) => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`Sever running!!  PORT ${PORT} `);
    });
  })
  .catch((err) => {
    console.log(err);
  });
