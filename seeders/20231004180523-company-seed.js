"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "companies",
      [
        {
          companyName: "넷마블",
          country: "한국",
          region: "판교",
          createdAt: "2023-08-30 10:31:22",
          updatedAt: "2023-10-05 03:10:11",
        },
        {
          companyName: "원티드랩",
          country: "한국",
          region: "서울",
          createdAt: "2023-08-27 11:21:52",
          updatedAt: "2023-10-02 13:33:36",
        },
        {
          companyName: "해촌",
          country: "한국",
          region: "양양",
          createdAt: "2023-08-12 22:43:12",
          updatedAt: "2023-10-05 11:34:21",
        },
        {
          companyName: "엔씨소프트",
          country: "한국",
          region: "판교",
          createdAt: "2023-08-25 05:31:33",
          updatedAt: "2023-10-04 12:12:12",
        },
        {
          companyName: "자연샘막국수",
          country: "한국",
          region: "양양",
          createdAt: "2023-08-11 17:36:55",
          updatedAt: "2023-10-02 19:22:55",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("companies", null, {});
  },
};
