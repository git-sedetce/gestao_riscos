"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "entities",
      [
        {
          id: 1,
          name: "ADAGRI",
          position: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: "ADECE",
          position: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: "CIPP",
          position: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: "IDT",
          position: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: "JUCEC",
          position: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          name: "SEDET",
          position: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          name: "SEDET CSI",
          position: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          name: "SEDET PGI",
          position: 8,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          name: "SEDET SAN",
          position: 9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 10,
          name: "SEDET SIN",
          position: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 11,
          name: "SEDET STE",
          position: 11,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 12,
          name: "ZPE",
          position: 12,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("entities", null, {});
  },
};
