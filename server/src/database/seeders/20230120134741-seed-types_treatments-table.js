"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "types_treatments",
      [
        {
          id: 1,
          name: "Aceitar",
          position: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: "Compartilhar",
          position: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: "Evitar",
          position: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: "Mitigar",
          position: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("types_treatments", null, {});
  },
};
