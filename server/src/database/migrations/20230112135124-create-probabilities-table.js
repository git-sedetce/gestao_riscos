"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("probabilities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      algorithm: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      position: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("probabilities");
  },
};
