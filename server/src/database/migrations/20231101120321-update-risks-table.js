"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("risks", "period_id", {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      references: { model: "periods", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("risks", "period_id");
  },
};
