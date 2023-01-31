"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "status_treatments",
      [
        {
          id: 1,
          name: "A Fazer",
          position: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: "Em Andamento",
          position: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: "Concluída",
          position: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("status_treatments", null, {});
  },
};
