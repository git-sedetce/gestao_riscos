"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "risks_origins",
      [
        {
          id: 1,
          name: "Entregas",
          position: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: "GPR",
          description: "Gestão para Resultados",
          position: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: "MAPP",
          position: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: "Plano de ação",
          position: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("risks_origins", null, {});
  },
};
