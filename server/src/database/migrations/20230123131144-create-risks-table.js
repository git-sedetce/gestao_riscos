"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("risks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      area_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "areas", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      user_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      types_origin_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "types_origins", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      risks_origin_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "risks_origins", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      period_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "periods", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      period_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "periods", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      event: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      cause: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      consequence: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      category_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      probability_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "probabilities", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      impact_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "impacts", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      priority: {
        defaultValue: false,
        type: Sequelize.DataTypes.BOOLEAN,
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
    await queryInterface.dropTable("risks");
  },
};
