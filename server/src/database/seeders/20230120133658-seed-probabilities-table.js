"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "probabilities",
      [
        {
          id: 1,
          name: "01 - Muito Baixo",
          algorithm: 1,
          position: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: "02 - Baixo",
          algorithm: 2,
          position: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: "05 - Médio",
          algorithm: 5,
          position: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: "08 - Alto",
          algorithm: 8,
          position: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: "10 - Muito Alto",
          algorithm: 10,
          position: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("probabilities", null, {});
  },
};
