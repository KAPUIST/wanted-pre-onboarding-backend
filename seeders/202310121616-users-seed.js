"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "손태권",
          email: "thsxornjs12@gmail.com",

          createdAt: "2023-08-30 10:31:22",
          updatedAt: "2023-10-05 03:10:11",
        },
        {
          name: "손지영",
          email: "thswldud12@gmail.com",

          createdAt: "2023-08-27 11:21:52",
          updatedAt: "2023-10-02 13:33:36",
        },
        {
          name: "손은미",
          email: "thsdmsal12@gmail.com",

          createdAt: "2023-08-12 22:43:12",
          updatedAt: "2023-10-05 11:34:21",
        },
        {
          name: "손민수",
          email: "thsalstn12@gmail.com",

          createdAt: "2023-08-25 05:31:33",
          updatedAt: "2023-10-04 12:12:12",
        },
        {
          name: "손감찬",
          email: "thsrkacks12@gmail.com",

          createdAt: "2023-08-11 17:36:55",
          updatedAt: "2023-10-02 19:22:55",
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
