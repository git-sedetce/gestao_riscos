"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("treatments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      types_treatment_id: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      start_date: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
      end_date: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
      status_treatment_id: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      risk_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "risks", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      notes: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
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
    await queryInterface.dropTable("treatments");
  },
};
