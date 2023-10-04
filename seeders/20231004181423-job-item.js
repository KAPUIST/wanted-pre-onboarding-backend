"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "jobItems",
      [
        {
          companyId: 1,
          position: "백엔드",
          reward: 1000000,
          detail: "저희 회사에서는 백엔드 주니어를 모집하고있습니다.",
          technology: "Node.js",
          createdAt: "2023-09-01 09:18:32",
          updatedAt: "2023-09-01 09:18:32",
        },
        {
          companyId: 2,
          position: "프론트 엔드",
          reward: 1000000,
          detail: "저희 회사에서는 프론트엔드 주니어를 모집하고있습니다.",
          technology: "React",
          createdAt: "2023-09-22 09:18:32",
          updatedAt: "2023-09-22 09:18:32",
        },
        {
          companyId: 3,
          position: "주방보조",
          reward: 500000,
          detail: "저희 회사에서는 주방보조를 모집하고있습니다.",
          technology: "보조경력",
          createdAt: "2023-09-23 11:22:33",
          updatedAt: "2023-09-23 11:22:33",
        },
        {
          companyId: 4,
          position: "게임 클라이언트",
          reward: 1000000,
          detail: "저희 회사에서는 게임클라이언트를 모집하고있습니다.",
          technology: "Unity",
          createdAt: "2023-09-25 09:18:32",
          updatedAt: "2023-09-25 09:18:32",
        },
        {
          companyId: 5,
          position: "서빙",
          reward: 1000000,
          detail: "저희 회사에서는 서버를 모집하고있습니다.",
          technology: "서빙경력",
          createdAt: "2023-09-29 17:18:32",
          updatedAt: "2023-09-29 17:18:32",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("jobItems", null, {});
  },
};
