"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
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
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING,
      },
      entity_id: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "entities", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      profile_id: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "profiles", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      is_active: {
        allowNull: true,
        defaultValue: true,
        type: Sequelize.DataTypes.BOOLEAN,
      },
      sign_in_count: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      accessed_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
